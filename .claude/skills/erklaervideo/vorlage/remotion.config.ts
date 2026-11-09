import {Config} from '@remotion/cli/config';
import fs from 'node:fs';
import path from 'node:path';

// Vorinstallierten Chrome-Headless-Shell der Cloud-Umgebung nutzen (spart den Download).
const basis = '/opt/pw-browsers';
if (fs.existsSync(basis)) {
  const ordner = fs.readdirSync(basis).filter((d) => d.startsWith('chromium_headless_shell-'));
  for (const d of ordner) {
    const exe = path.join(basis, d, 'chrome-headless-shell-linux64', 'chrome-headless-shell');
    if (fs.existsSync(exe)) {
      Config.setBrowserExecutable(exe);
      break;
    }
  }
}

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(16); // Zwischenstufe in hoher Qualität; finale Kompression macht finalisieren.py
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);
Config.setConcurrency(null);
