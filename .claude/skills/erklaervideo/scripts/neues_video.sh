#!/usr/bin/env bash
# Legt einen Arbeitsordner für ein neues Video an (außerhalb des Repositorys).
# Aufruf: neues_video.sh <kurzname>      z. B. neues_video.sh gl8-dampfmaschine
set -euo pipefail
NAME="${1:?Kurzname fehlt}"
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
ZIEL="${ERKLAERVIDEO_ARBEIT:-$HOME/erklaervideo-arbeit}/$NAME"
mkdir -p "$ZIEL"
# Vorlage kopieren, ohne node_modules
( cd "$SKILL/vorlage" && tar --exclude=node_modules -cf - . ) | ( cd "$ZIEL" && tar -xf - )
mkdir -p "$ZIEL/public/bilder" "$ZIEL/public/audio" "$ZIEL/ausgabe" "$ZIEL/pruefung"
cp "$SKILL/scripts/tts.py" "$ZIEL/"
cd "$ZIEL"
npm ci --no-audit --no-fund --prefer-offline >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null
echo "$ZIEL"
