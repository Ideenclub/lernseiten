#!/usr/bin/env bash
# Rendert Video und Vorschaubild. Aufruf im Projektordner: render.sh <Dateiname-ohne-Endung>
set -euo pipefail
NAME="${1:?Dateiname fehlt, z. B. Klasse8_Dampfmaschine_2026-11-09}"
mkdir -p ausgabe
npx remotion render Video "ausgabe/roh.mp4" --log=error
npx remotion still Vorschaubild "ausgabe/vorschau.jpg" --image-format=jpeg --jpeg-quality=88 --log=error
python3 "$(dirname "$0")/finalisieren.py" "ausgabe/roh.mp4" "ausgabe/$NAME.mp4"
