import fs from 'fs';
import path from 'path';

const distElectron = path.resolve('dist-electron');
if (!fs.existsSync(distElectron)) {
  fs.mkdirSync(distElectron, { recursive: true });
}

const mainJsPath = path.join(distElectron, 'main.js');
const content = `// Render fallback entry point
import '../server.mjs';
`;

fs.writeFileSync(mainJsPath, content, 'utf8');
console.log('Successfully created dist-electron/main.js fallback for Render!');
