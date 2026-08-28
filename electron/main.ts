import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';
import http from 'node:http';
import fs from 'node:fs';
import { Communicate } from 'edge-tts-universal';
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
let cachedBundleLocation: string | null = null;

const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
  win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: 'Remotion AI Video Auto-Editor',
    icon: path.join(process.env.VITE_PUBLIC || '', 'icon.png'),
    backgroundColor: '#0B0F19',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false // Allow loading local files and media preview
    }
  });

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST || '', 'index.html'));
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
  setupIpcHandlers();
});

function fetchHttpBuffer(urlStr: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = urlStr.startsWith('https') ? https : http;
    client
      .get(
        urlStr,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
            Referer: 'https://translate.google.com/'
          }
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 400) {
            return reject(new Error(`HTTP error ${res.statusCode}`));
          }
          const chunks: Buffer[] = [];
          res.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
          res.on('end', () => resolve(Buffer.concat(chunks)));
        }
      )
      .on('error', reject);
  });
}

async function fallbackTTS(text: string, voice: string) {
  try {
    const cleanText = text.trim();
    const rawWords = cleanText.split(/\s+/).filter(Boolean);
    const isVietnamese = !voice.startsWith('en-');
    const lang = isVietnamese ? 'vi' : 'en';

    const chunks: string[] = [];
    let cur = '';
    for (const w of rawWords) {
      if ((cur + ' ' + w).length > 80) {
        chunks.push(cur.trim());
        cur = w;
      } else {
        cur += ' ' + w;
      }
    }
    if (cur.trim()) chunks.push(cur.trim());

    const audioBuffers: Buffer[] = [];
    for (const chunk of chunks) {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        chunk
      )}&tl=${lang}&client=tw-ob`;
      const buf = await fetchHttpBuffer(url);
      audioBuffers.push(buf);
    }

    const fullBuffer = Buffer.concat(audioBuffers);
    const base64 = fullBuffer.toString('base64');
    const audioUrl = `data:audio/mp3;base64,${base64}`;

    const estimatedDuration = Math.max(3.0, fullBuffer.length / 3800);
    const words: Array<{ word: string; start: number; end: number }> = [];
    const timePerWord = (estimatedDuration - 0.4) / Math.max(rawWords.length, 1);

    let curTime = 0.2;
    for (const w of rawWords) {
      const wDuration = Math.max(0.2, Math.min(0.7, timePerWord));
      words.push({
        word: w,
        start: Number(curTime.toFixed(2)),
        end: Number((curTime + wDuration).toFixed(2))
      });
      curTime += wDuration;
    }

    return {
      audioUrl,
      duration: Number((curTime + 0.3).toFixed(2)),
      words
    };
  } catch (err) {
    const rawWords = text.trim().split(/\s+/).filter(Boolean);
    const words = rawWords.map((w: string, idx: number) => ({
      word: w,
      start: Number((idx * 0.35 + 0.2).toFixed(2)),
      end: Number(((idx + 1) * 0.35 + 0.2).toFixed(2))
    }));
    return {
      audioUrl: '',
      duration: Math.max(3.5, rawWords.length * 0.35 + 0.5),
      words
    };
  }
}

function setupIpcHandlers() {
  // TTS Handler: Synthesizes high quality natural speech with accurate word timing using Edge-TTS
  ipcMain.handle(
    'tts:synthesize',
    async (_, { text, voice = 'vi-VN-HoaiMyNeural', rate = '+0%', pitch = '+0Hz' }) => {
      try {
        const cleanText = text.trim();
        if (!cleanText) {
          return { audioUrl: '', duration: 1.0, words: [] };
        }

        const comm = new Communicate(cleanText, {
          voice,
          rate,
          pitch
        });

        const words: Array<{ word: string; start: number; end: number }> = [];
        const audioChunks: Buffer[] = [];

        for await (const rawChunk of comm.stream()) {
          const chunk = rawChunk as any;
          if (chunk.type === 'audio' && chunk.data) {
            audioChunks.push(Buffer.isBuffer(chunk.data) ? chunk.data : Buffer.from(chunk.data));
          } else if (chunk.type === 'WordBoundary' && chunk.text) {
            const start = Number(((chunk.offset || 0) / 10000000).toFixed(2));
            const dur = Number(((chunk.duration || 0) / 10000000).toFixed(2));
            words.push({
              word: String(chunk.text),
              start,
              end: Number((start + dur).toFixed(2))
            });
          }
        }

        const fullBuffer = Buffer.concat(audioChunks);
        if (fullBuffer.length === 0) {
          throw new Error('Empty audio received from Edge-TTS');
        }

        const base64 = fullBuffer.toString('base64');
        const audioUrl = `data:audio/mp3;base64,${base64}`;

        let duration = 3.0;
        if (words.length > 0) {
          duration = Number((words[words.length - 1].end + 0.3).toFixed(2));
        } else {
          duration = Number(Math.max(2.5, fullBuffer.length / 5500).toFixed(2));
        }

        return {
          audioUrl,
          duration,
          words
        };
      } catch (err: any) {
        console.warn('Edge-TTS direct synthesis error, falling back:', err?.message || err);
        return fallbackTTS(text, voice);
      }
    }
  );

  // Real Remotion Video Rendering Handler
  ipcMain.handle('render:video', async (_, { project, resolution = '1080p' }) => {
    try {
      const outDir = path.resolve('out');
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
      }

      const safeTitle = (project.title || 'Video')
        .replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')
        .slice(0, 40);
      const outFilename = `${safeTitle}_${Date.now()}.mp4`;
      const outputLocation = path.join(outDir, outFilename);

      win?.webContents.send('render:progress', {
        progress: 5,
        stage: 'bundle',
        message: 'Đang chuẩn bị và đóng gói bundle Remotion...'
      });

      const entryPoint = path.resolve('src/remotion/index.ts');
      cachedBundleLocation = await bundle({
        entryPoint,
        onProgress: (p) => {
          win?.webContents.send('render:progress', {
            progress: Math.min(25, Math.round(5 + (p * 20) / 100)),
            stage: 'bundle',
            message: `Đang biên dịch mã nguồn Remotion (${p}%)...`
          });
        }
      });

      win?.webContents.send('render:progress', {
        progress: 28,
        stage: 'composition',
        message: 'Đang thiết lập cấu hình video và phân cảnh...'
      });

      const compositionId = project.aspectRatio === '9:16' ? 'Shorts916' : 'Landscape169';

      const composition = await selectComposition({
        serveUrl: cachedBundleLocation,
        id: compositionId,
        inputProps: { project }
      });

      // Calculate exact total frames matching Series.Sequence
      const fps = project.fps || 30;
      const durationInFrames = Math.max(
        (project.scenes || []).reduce(
          (acc: number, s: any) =>
            acc + Math.max(Math.round((s.audioDuration || 4) * fps), Math.round(2 * fps)),
          0
        ),
        30
      );

      // Width and Height according to aspect ratio and resolution
      let width = project.aspectRatio === '9:16' ? 1080 : 1920;
      let height = project.aspectRatio === '9:16' ? 1920 : 1080;

      if (resolution === '4k') {
        width = project.aspectRatio === '9:16' ? 2160 : 3840;
        height = project.aspectRatio === '9:16' ? 3840 : 2160;
      }

      win?.webContents.send('render:progress', {
        progress: 32,
        stage: 'rendering',
        message: `Bắt đầu render ${durationInFrames} khung hình (${width}x${height})...`
      });

      await renderMedia({
        composition: {
          ...composition,
          durationInFrames,
          width,
          height,
          fps
        },
        serveUrl: cachedBundleLocation,
        codec: 'h264',
        outputLocation,
        inputProps: { project },
        onProgress: ({ progress }) => {
          const overallProgress = Math.min(99, Math.round(32 + progress * 66));
          win?.webContents.send('render:progress', {
            progress: overallProgress,
            stage: 'rendering',
            message: `Đang xử lý hình ảnh, phụ đề & âm thanh (${Math.round(progress * 100)}%)...`
          });
        }
      });

      win?.webContents.send('render:progress', {
        progress: 100,
        stage: 'complete',
        message: 'Render video MP4 thành công!'
      });

      return {
        success: true,
        filePath: outputLocation
      };
    } catch (renderError: any) {
      console.error('Render media error in main process:', renderError);
      throw new Error(renderError.message || 'Render video thất bại');
    }
  });

  // Open file or directory in explorer
  ipcMain.handle('shell:open-path', async (_, targetPath: string) => {
    return shell.openPath(targetPath);
  });

  // Dialog file selector
  ipcMain.handle('dialog:select-file', async (_, options) => {
    if (!win) return null;
    const res = await dialog.showOpenDialog(win, options);
    return res.filePaths;
  });

  // Select output folder
  ipcMain.handle('dialog:select-folder', async () => {
    if (!win) return null;
    const res = await dialog.showOpenDialog(win, {
      properties: ['openDirectory']
    });
    return res.filePaths[0] || null;
  });

  // Web Image Search (Accurate to Google / Web results for any keyword)
  ipcMain.handle('media:search-web', async (_, query: string) => {
    try {
      const cleanQuery = (query || '').trim();
      if (!cleanQuery) return [];

      const vqdRes = await fetch(
        `https://duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}&iax=images&ia=images`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
          }
        }
      );
      const html = await vqdRes.text();
      const vqdMatch = html.match(/vqd=([\d-]+)/);
      if (!vqdMatch) return [];

      const vqd = vqdMatch[1];
      const imgRes = await fetch(
        `https://duckduckgo.com/i.js?l=wt-wt&o=json&q=${encodeURIComponent(cleanQuery)}&vqd=${vqd}&f=,,,`,
        {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
            Referer: 'https://duckduckgo.com/'
          }
        }
      );
      const json = await imgRes.json();
      return (json.results || []).slice(0, 24).map((r: any, idx: number) => ({
        id: `web-img-${idx}-${Date.now()}`,
        type: 'image',
        url: r.image,
        thumbnail: r.thumbnail || r.image,
        title: r.title || cleanQuery,
        source: 'web'
      }));
    } catch (err) {
      console.warn('Web image search error:', err);
      return [];
    }
  });

  // App Lifecycle: Restart & Reload
  ipcMain.handle('app:restart', () => {
    app.relaunch();
    app.exit(0);
  });

  ipcMain.handle('app:reload', () => {
    win?.webContents.reload();
  });
}

