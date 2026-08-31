import fs from 'fs';
import path from 'path';

const distElectron = path.resolve('dist-electron');
if (!fs.existsSync(distElectron)) {
  fs.mkdirSync(distElectron, { recursive: true });
}

const mainJsPath = path.join(distElectron, 'main.js');
if (!fs.existsSync(mainJsPath)) {
  const content = `// Render fallback entry point
import '../server.mjs';
`;
  fs.writeFileSync(mainJsPath, content, 'utf8');
  console.log('Created dist-electron/main.js fallback for Render!');
} else {
  console.log('dist-electron/main.js exists, keeping built Electron main process.');
}

const preloadSrc = path.resolve('electron/preload.cjs');
const preloadDest = path.join(distElectron, 'preload.cjs');
if (fs.existsSync(preloadSrc)) {
  fs.copyFileSync(preloadSrc, preloadDest);
  console.log('Copied pure CommonJS preload.cjs to dist-electron/preload.cjs');
}

