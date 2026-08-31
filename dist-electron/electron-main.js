import { app as R, BrowserWindow as W, ipcMain as C, shell as E, dialog as U, session as P } from "electron";
import T from "node:path";
import { fileURLToPath as q } from "node:url";
import K from "node:https";
import L from "node:http";
import A from "node:fs";
import { Communicate as V } from "edge-tts-universal";
import { bundle as F } from "@remotion/bundler";
import { selectComposition as j, renderMedia as H } from "@remotion/renderer";
const G = q(import.meta.url), S = T.dirname(G);
process.env.DIST = T.join(S, "../dist");
process.env.VITE_PUBLIC = R.isPackaged ? process.env.DIST : T.join(process.env.DIST, "../public");
let s, _ = null;
const B = process.env.VITE_DEV_SERVER_URL;
function D() {
  s = new W({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    show: !0,
    title: "Remotion AI Video Auto-Editor",
    icon: T.join(process.env.VITE_PUBLIC || "", "icon.png"),
    backgroundColor: "#0B0F19",
    webPreferences: {
      preload: A.existsSync(T.join(S, "preload.cjs")) ? T.join(S, "preload.cjs") : T.join(S, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !1
      // Allow loading local files and media preview
    }
  }), P.defaultSession.setPermissionRequestHandler((M, b, n) => {
    n(!0);
  }), s.show(), s.focus(), s.webContents.on("did-finish-load", () => {
    s == null || s.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), B ? s.loadURL(B) : s.loadFile(T.join(process.env.DIST || "", "index.html"));
}
R.on("window-all-closed", () => {
  process.platform !== "darwin" && (R.quit(), s = null);
});
R.on("activate", () => {
  W.getAllWindows().length === 0 && D();
});
R.whenReady().then(() => {
  D(), J();
});
function z(M) {
  return new Promise((b, n) => {
    (M.startsWith("https") ? K : L).get(
      M,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/"
        }
      },
      (t) => {
        if (t.statusCode && t.statusCode >= 400)
          return n(new Error(`HTTP error ${t.statusCode}`));
        const c = [];
        t.on("data", (e) => c.push(Buffer.isBuffer(e) ? e : Buffer.from(e))), t.on("end", () => b(Buffer.concat(c)));
      }
    ).on("error", n);
  });
}
async function O(M, b) {
  try {
    const r = M.trim().split(/\s+/).filter(Boolean), c = !b.startsWith("en-") ? "vi" : "en", e = [];
    let h = "";
    for (const g of r)
      (h + " " + g).length > 80 ? (e.push(h.trim()), h = g) : h += " " + g;
    h.trim() && e.push(h.trim());
    const i = [];
    for (const g of e) {
      const k = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        g
      )}&tl=${c}&client=tw-ob`, x = await z(k);
      i.push(x);
    }
    const o = Buffer.concat(i), d = `data:audio/mp3;base64,${o.toString("base64")}`, l = Math.max(3, o.length / 3800), m = [], v = (l - 0.4) / Math.max(r.length, 1);
    let a = 0.2;
    for (const g of r) {
      const k = Math.max(0.2, Math.min(0.7, v));
      m.push({
        word: g,
        start: Number(a.toFixed(2)),
        end: Number((a + k).toFixed(2))
      }), a += k;
    }
    return {
      audioUrl: d,
      duration: Number((a + 0.3).toFixed(2)),
      words: m
    };
  } catch {
    const r = M.trim().split(/\s+/).filter(Boolean), t = r.map((c, e) => ({
      word: c,
      start: Number((e * 0.35 + 0.2).toFixed(2)),
      end: Number(((e + 1) * 0.35 + 0.2).toFixed(2))
    }));
    return {
      audioUrl: "",
      duration: Math.max(3.5, r.length * 0.35 + 0.5),
      words: t
    };
  }
}
function J() {
  C.handle(
    "tts:synthesize",
    async (b, { text: n, voice: r = "vi-VN-HoaiMyNeural", rate: t = "+0%", pitch: c = "+0Hz" }) => {
      try {
        const e = n.trim();
        if (!e)
          return { audioUrl: "", duration: 1, words: [] };
        const h = new V(e, {
          voice: r,
          rate: t,
          pitch: c
        }), i = [], o = [];
        for await (const v of h.stream()) {
          const a = v;
          if (a.type === "audio" && a.data)
            o.push(Buffer.isBuffer(a.data) ? a.data : Buffer.from(a.data));
          else if (a.type === "WordBoundary" && a.text) {
            const g = Number(((a.offset || 0) / 1e7).toFixed(2)), k = Number(((a.duration || 0) / 1e7).toFixed(2));
            i.push({
              word: String(a.text),
              start: g,
              end: Number((g + k).toFixed(2))
            });
          }
        }
        const u = Buffer.concat(o);
        if (u.length === 0)
          throw new Error("Empty audio received from Edge-TTS");
        const l = `data:audio/mp3;base64,${u.toString("base64")}`;
        let m = 3;
        return i.length > 0 ? m = Number((i[i.length - 1].end + 0.3).toFixed(2)) : m = Number(Math.max(2.5, u.length / 5500).toFixed(2)), {
          audioUrl: l,
          duration: m,
          words: i
        };
      } catch (e) {
        return console.warn("Edge-TTS direct synthesis error, falling back:", (e == null ? void 0 : e.message) || e), O(n, r);
      }
    }
  ), C.handle("render:video", async (b, { project: n, resolution: r = "1080p" }) => {
    try {
      const t = T.resolve("out");
      A.existsSync(t) || A.mkdirSync(t, { recursive: !0 });
      const e = `${(n.title || "Video").replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, "_").slice(0, 40)}_${Date.now()}.mp4`, h = T.join(t, e);
      s == null || s.webContents.send("render:progress", {
        progress: 5,
        stage: "bundle",
        message: "Đang chuẩn bị và đóng gói bundle Remotion..."
      });
      const i = T.resolve("src/remotion/index.ts");
      _ = await F({
        entryPoint: i,
        onProgress: (a) => {
          s == null || s.webContents.send("render:progress", {
            progress: Math.min(25, Math.round(5 + a * 20 / 100)),
            stage: "bundle",
            message: `Đang biên dịch mã nguồn Remotion (${a}%)...`
          });
        }
      }), s == null || s.webContents.send("render:progress", {
        progress: 28,
        stage: "composition",
        message: "Đang thiết lập cấu hình video và phân cảnh..."
      });
      const o = n.aspectRatio === "9:16" ? "Shorts916" : "Landscape169", u = await j({
        serveUrl: _,
        id: o,
        inputProps: { project: n }
      }), d = n.fps || 30, l = Math.max(
        (n.scenes || []).reduce(
          (a, g) => a + Math.max(Math.round((g.audioDuration || 4) * d), Math.round(2 * d)),
          0
        ),
        30
      );
      let m = n.aspectRatio === "9:16" ? 1080 : 1920, v = n.aspectRatio === "9:16" ? 1920 : 1080;
      return r === "4k" && (m = n.aspectRatio === "9:16" ? 2160 : 3840, v = n.aspectRatio === "9:16" ? 3840 : 2160), s == null || s.webContents.send("render:progress", {
        progress: 32,
        stage: "rendering",
        message: `Bắt đầu render ${l} khung hình (${m}x${v})...`
      }), await H({
        composition: {
          ...u,
          durationInFrames: l,
          width: m,
          height: v,
          fps: d
        },
        serveUrl: _,
        codec: "h264",
        outputLocation: h,
        inputProps: { project: n },
        onProgress: ({ progress: a }) => {
          const g = Math.min(99, Math.round(32 + a * 66));
          s == null || s.webContents.send("render:progress", {
            progress: g,
            stage: "rendering",
            message: `Đang xử lý hình ảnh, phụ đề & âm thanh (${Math.round(a * 100)}%)...`
          });
        }
      }), s == null || s.webContents.send("render:progress", {
        progress: 100,
        stage: "complete",
        message: "Render video MP4 thành công!"
      }), {
        success: !0,
        filePath: h
      };
    } catch (t) {
      throw console.error("Render media error in main process:", t), new Error(t.message || "Render video thất bại");
    }
  }), C.handle("shell:open-path", async (b, n) => E.openPath(n)), C.handle("dialog:select-file", async (b, n) => s ? (await U.showOpenDialog(s, n)).filePaths : null), C.handle("dialog:select-folder", async () => s && (await U.showOpenDialog(s, {
    properties: ["openDirectory"]
  })).filePaths[0] || null), C.handle("audio:read-file-base64", async (b, n) => {
    try {
      if (!n || !A.existsSync(n)) return null;
      const r = await A.promises.readFile(n), t = T.extname(n).toLowerCase().replace(".", "");
      let c = "audio/mp3";
      t === "wav" ? c = "audio/wav" : t === "m4a" ? c = "audio/m4a" : t === "aac" ? c = "audio/aac" : t === "ogg" && (c = "audio/ogg");
      const e = r.toString("base64");
      return {
        dataUrl: `data:${c};base64,${e}`,
        base64: e,
        mimeType: c,
        sizeBytes: r.length
      };
    } catch (r) {
      return console.error("Error reading audio file base64:", r), null;
    }
  }), C.handle("audio:transcribe", async (b, n) => {
    var i, o, u, d, l, m, v;
    const { audioBase64: r, mimeType: t = "audio/mp3", apiKey: c } = n;
    if (!r) return { error: "Không tìm thấy dữ liệu âm thanh" };
    const e = (t || "audio/mp3").split(";")[0].trim().toLowerCase(), h = e.includes("webm") ? "audio/webm" : e.includes("wav") ? "audio/wav" : e.includes("ogg") ? "audio/ogg" : e.includes("mp4") || e.includes("m4a") || e.includes("aac") ? "audio/mp4" : "audio/mp3";
    if (c && c.trim()) {
      const a = `Bạn là hệ thống chuyển âm thanh thành văn bản (Speech-to-Text) và đồng bộ phụ đề Karaoke.
Nhiệm vụ: Nghe kỹ file âm thanh đính kèm và nhận diện chính xác toàn bộ câu từ được phát âm (tiếng Việt hoặc tiếng Anh).

Yêu cầu BẮT BUỘC:
1. "narration": Văn bản toàn bộ câu thoại nghe được trong audio (không thêm thắt nội dung ngoài âm thanh).
2. "duration": Thời lượng file âm thanh tính bằng giây (số thực, ví dụ 3.5).
3. "language": "vi" hoặc "en".
4. "words": Mảng từng từ được phát âm cùng mốc thời gian bắt đầu ("start") và kết thúc ("end") tính bằng giây (bắt đầu từ 0.0s).

TRẢ VỀ DUY NHẤT 1 ĐỐI TƯỢNG JSON (KHÔNG KÈM KÝ TỰ MARKDOWN):
{
  "narration": "câu thoại bạn nghe được",
  "language": "vi",
  "duration": 3.5,
  "words": [
    { "word": "Từ", "start": 0.1, "end": 0.4 },
    { "word": "thứ", "start": 0.45, "end": 0.7 }
  ]
}`;
      let g = [
        "gemini-2.0-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-1.5-flash-002",
        "gemini-1.5-flash-8b",
        "gemini-2.0-flash-exp",
        "gemini-1.5-pro"
      ];
      try {
        const x = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${c.trim()}`);
        if (x.ok) {
          const w = await x.json();
          if (Array.isArray(w.models)) {
            const p = w.models.filter((f) => {
              var y;
              return (y = f.supportedGenerationMethods) == null ? void 0 : y.includes("generateContent");
            }).map((f) => f.name.replace(/^models\//, ""));
            p.length > 0 && (g = p.sort((f, y) => f.includes("2.0-flash") ? -1 : y.includes("2.0-flash") ? 1 : f.includes("flash") ? -1 : y.includes("flash") ? 1 : 0));
          }
        } else {
          const w = await x.json().catch(() => ({}));
          if ((i = w == null ? void 0 : w.error) != null && i.message)
            return { error: `Gemini API Key lỗi: ${w.error.message}` };
        }
      } catch (x) {
        console.warn("Auto-discover Gemini models warning:", x);
      }
      let k = "";
      for (const x of g)
        try {
          const w = `https://generativelanguage.googleapis.com/v1beta/models/${x}:generateContent?key=${c.trim()}`, p = await fetch(w, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      inline_data: {
                        mime_type: h,
                        data: r
                      }
                    },
                    { text: a }
                  ]
                }
              ],
              generationConfig: {
                response_mime_type: "application/json",
                temperature: 0.1
              }
            })
          });
          if (p.ok) {
            const f = await p.json();
            let y = (m = (l = (d = (u = (o = f == null ? void 0 : f.candidates) == null ? void 0 : o[0]) == null ? void 0 : u.content) == null ? void 0 : d.parts) == null ? void 0 : l[0]) == null ? void 0 : m.text;
            if (y) {
              y = y.trim().replace(/^```json\s*/i, "").replace(/^```\s*/, "").replace(/```$/, "").trim();
              const $ = JSON.parse(y);
              if ($ && $.narration)
                return {
                  narration: String($.narration).trim(),
                  language: $.language || "vi",
                  audioDuration: Number($.duration || 4),
                  words: Array.isArray($.words) ? $.words : []
                };
            }
          } else {
            const f = await p.json().catch(() => ({}));
            k = ((v = f == null ? void 0 : f.error) == null ? void 0 : v.message) || `HTTP ${p.status}`;
          }
        } catch (w) {
          k = w.message;
        }
      if (k)
        return { error: `Gemini API: ${k}` };
    }
    return { error: "Chưa có Gemini API Key. Vui lòng nhập API Key trong Cài đặt (Settings) trên thanh menu để AI tự động nghe và chuyển thành chữ." };
  }), C.handle("media:search-web", async (b, n) => {
    try {
      const r = (n || "").trim();
      if (!r) return [];
      try {
        const h = await fetch(
          `https://www.bing.com/images/async?q=${encodeURIComponent(r)}&count=25&first=0`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
              Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7"
            }
          }
        );
        if (h.ok) {
          const u = [...(await h.text()).matchAll(/murl&quot;:&quot;(http[^&]+)&quot;/g)].map((d) => decodeURIComponent(d[1])).filter((d) => d && !d.endsWith(".svg") && !d.includes("favicon"));
          if (u.length > 0)
            return u.slice(0, 20).map((d, l) => ({
              id: `bing-img-${l}-${Date.now()}`,
              type: "image",
              url: d,
              thumbnail: d,
              title: r,
              source: "web"
            }));
        }
      } catch (h) {
        console.warn("Bing search attempt failed, trying DuckDuckGo fallback:", h);
      }
      const e = (await (await fetch(
        `https://duckduckgo.com/?q=${encodeURIComponent(r)}&iax=images&ia=images`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
          }
        }
      )).text()).match(/vqd=([\d-]+)/);
      if (e) {
        const h = e[1], o = await (await fetch(
          `https://duckduckgo.com/i.js?l=wt-wt&o=json&q=${encodeURIComponent(r)}&vqd=${h}&f=,,,`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
              Referer: "https://duckduckgo.com/"
            }
          }
        )).json();
        if (o.results && o.results.length > 0)
          return o.results.slice(0, 20).map((u, d) => ({
            id: `ddg-img-${d}-${Date.now()}`,
            type: "image",
            url: u.image,
            thumbnail: u.thumbnail || u.image,
            title: u.title || r,
            source: "web"
          }));
      }
      return [];
    } catch (r) {
      return console.warn("Web image search error:", r), [];
    }
  });
  const M = /* @__PURE__ */ new Map();
  C.handle("media:search-videos", async (b, n, r = 1) => {
    try {
      const t = (n || "").trim();
      if (!t) return [];
      const c = Math.max(1, Number(r) || 1), e = `${t.toLowerCase()}_p${c}`;
      if (M.has(e))
        return M.get(e);
      const h = (l) => l.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D"), i = t.toLowerCase();
      let o = [];
      if (/đi học|trường học|lớp học|học sinh|sinh viên|school|student|classroom/i.test(i))
        o = ["school", "student", "classroom", "campus", "studying"];
      else if (/tắm|đi tắm|gội đầu|ngâm mình|bơi|hồ bơi|bãi biển|nước mát/i.test(i))
        o = ["shower", "bath", "swimming pool", "relaxing water"];
      else if (/vũ trụ|thiên hà|ngân hà|galaxy|không gian|hành tinh|sao|cosmos|nebula|space/i.test(i))
        o = ["galaxy", "space", "nebula", "stars"];
      else if (/bún|cá|phở|món|ẩm thực|nước dùng|ăn|nấu|chiên|nướng|nhà hàng|quán|chế biến|tô|bát|thực khách|food|uống|cafe|cà phê|trà/i.test(i))
        o = /cá/i.test(i) ? ["fish cooking", "cooking", "food"] : ["cooking", "delicious food", "kitchen"];
      else if (/ngủ|thức dậy|buổi sáng|bình minh|giường|phòng ngủ/i.test(i))
        o = ["waking up", "morning", "bed", "sunrise"];
      else if (/mua sắm|shopping|siêu thị|thời trang|quần áo|váy|cửa hàng/i.test(i))
        o = ["shopping", "fashion", "store", "clothes"];
      else if (/tiền|tài chính|chứng khoán|cổ phiếu|doanh thu|lợi nhuận|ngân hàng|giàu|đầu tư|tỷ đồng|triệu|money|finance/i.test(i))
        o = ["money", "finance", "business", "growth"];
      else if (/code|lập trình|ai|trí tuệ nhân tạo|phần mềm|công nghệ|máy tính|developer|robot|thuật toán|tech/i.test(i))
        o = ["technology", "coding", "artificial intelligence", "programming"];
      else if (/máy bay|chuyến bay|sân bay|cất cánh|hàng không|airplane|flight/i.test(i))
        o = ["airplane", "flight", "clouds", "travel"];
      else if (/đua xe|cao tốc|lái xe|xe hơi|ô tô|đường cao tốc|highway|driving/i.test(i))
        o = ["highway", "driving", "night drive", "cars"];
      else if (/du lịch|biển|núi|khám phá|bãi biển|travel|nature|phong cảnh/i.test(i))
        o = ["travel", "nature", "ocean", "landscape"];
      else if (/thành phố|đô thị|tòa nhà|đường phố|city|urban/i.test(i))
        o = ["city", "urban", "skyline", "traffic"];
      else if (/thể thao|gym|chạy bộ|sức khỏe|fitness|workout|yoga/i.test(i))
        o = ["fitness", "workout", "running", "gym"];
      else if (/^[a-zA-Z0-9\s\-',.]+$/.test(t)) {
        const l = t.split(/\s+/).filter(Boolean);
        o = [t, l[0] || "lifestyle", l[l.length - 1] || "cinematic"];
      } else
        o = [h(t).replace(/[^\w\s]/gi, " ").trim(), "lifestyle", "cinematic"];
      const u = (c - 1) % o.length, d = [
        o[u],
        ...o.filter((l, m) => m !== u)
      ];
      for (const l of d)
        if (l)
          try {
            const m = new AbortController(), v = setTimeout(() => m.abort(), 3500), a = Math.floor((c - 1) / o.length) + 1, g = await fetch(
              `https://coverr.co/api/videos?query=${encodeURIComponent(l)}&page=${a}&urls=true`,
              {
                signal: m.signal,
                headers: {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
                }
              }
            );
            if (clearTimeout(v), g.ok) {
              const x = (await g.json()).hits || [];
              if (x.length > 0) {
                const w = x.slice(0, 12).map((p, f) => {
                  var y, $, N, I;
                  return {
                    id: `coverr-video-${f}-${Date.now()}`,
                    type: "video",
                    url: ((y = p.urls) == null ? void 0 : y.mp4) || (($ = p.urls) == null ? void 0 : $.mp4_preview),
                    previewUrl: ((N = p.urls) == null ? void 0 : N.mp4_preview) || ((I = p.urls) == null ? void 0 : I.mp4),
                    thumbnail: p.thumbnail || p.poster,
                    title: p.title || t,
                    source: "web",
                    duration: Math.round(Number(p.duration || 8))
                  };
                });
                return M.set(e, w), w;
              }
            }
          } catch (m) {
            console.warn(`Coverr fetch failed for keyword: ${l}`, m);
          }
      return [];
    } catch (t) {
      return console.warn("Video search error in main process:", t), [];
    }
  }), C.handle("app:restart", () => {
    R.relaunch(), R.exit(0);
  }), C.handle("app:reload", () => {
    s == null || s.webContents.reload();
  });
}
