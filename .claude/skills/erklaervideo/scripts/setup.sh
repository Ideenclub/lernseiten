#!/usr/bin/env bash
# Richtet alles für die Erklärvideo-Produktion ein. Mehrfaches Ausführen ist unschädlich:
# Bereits Vorhandenes wird übersprungen. Dauer beim ersten Mal ca. 1–2 Minuten.
set -uo pipefail

CACHE="$HOME/.cache/erklaervideo"
VENV="$CACHE/venv"
STIMMEN="$CACHE/stimmen"
STIMME="${ERKLAERVIDEO_STIMME:-de_DE-thorsten-high}"
HF="https://huggingface.co/rhasspy/piper-voices/resolve/main"
mkdir -p "$CACHE" "$STIMMEN"
FEHLER=0

melde() { printf '  %-28s %s\n' "$1" "$2"; }
gesperrt() {
  echo "  !! Download gescheitert: $1"
  echo "     Falls die Umgebung den Zugriff sperrt, muss diese Adresse freigegeben werden: $(echo "$1" | sed -E 's#https?://([^/]+).*#\1#')"
  FEHLER=1
}

echo "== Erklärvideo-Setup"

# 1) Node.js (für Remotion)
if command -v node >/dev/null && [ "$(node -p 'process.versions.node.split(".")[0]')" -ge 18 ]; then
  melde "Node.js" "ok ($(node -v))"
else
  melde "Node.js" "fehlt – installiere über apt"
  (apt-get update -qq && apt-get install -y -qq nodejs npm) >/dev/null 2>&1 || { echo "  !! Node.js konnte nicht installiert werden"; FEHLER=1; }
fi

# 2) ffmpeg (Lautheit, Kompression, Prüfung)
if command -v ffmpeg >/dev/null && [ "$(ffmpeg -hide_banner -encoders 2>/dev/null | grep -c libx264)" -gt 0 ]; then
  melde "ffmpeg" "ok"
else
  melde "ffmpeg" "fehlt – installiere über apt"
  (apt-get update -qq && apt-get install -y -qq ffmpeg) >/dev/null 2>&1 || { echo "  !! ffmpeg konnte nicht installiert werden"; FEHLER=1; }
fi

# 3) Python-Umgebung mit Sprachausgabe (Piper) und QR-Codes
if [ ! -x "$VENV/bin/python" ]; then
  python3 -m venv "$VENV" || { echo "  !! python3-venv fehlt"; apt-get install -y -qq python3-venv >/dev/null 2>&1; python3 -m venv "$VENV"; }
fi
if "$VENV/bin/python" -c "import piper, qrcode, PIL, numpy" 2>/dev/null; then
  melde "Piper / qrcode" "ok"
else
  "$VENV/bin/pip" install -q --disable-pip-version-check "piper-tts==1.8.0" "qrcode[pil]==8.2" numpy pillow \
    && melde "Piper / qrcode" "installiert" || { echo "  !! pip-Installation gescheitert (pypi.org erreichbar?)"; FEHLER=1; }
fi

# 4) Deutsche Stimme
for endung in onnx onnx.json; do
  datei="$STIMMEN/$STIMME.$endung"
  if [ ! -s "$datei" ]; then
    sprache="${STIMME%%_*}"          # de
    rest="${STIMME#*-}"              # thorsten-high
    name="${rest%-*}"; qual="${rest##*-}"
    land="${STIMME%%-*}"             # de_DE
    url="$HF/$sprache/$land/$name/$qual/$STIMME.$endung"
    curl -fsSL --retry 3 -o "$datei.tmp" "$url" && mv "$datei.tmp" "$datei" || gesperrt "$url"
  fi
done
[ -s "$STIMMEN/$STIMME.onnx" ] && melde "Stimme $STIMME" "ok"

# 5) Browser zum Rendern
if ls /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell >/dev/null 2>&1; then
  melde "Render-Browser" "ok (vorinstalliert)"
else
  melde "Render-Browser" "wird beim ersten Rendern von Remotion geladen"
fi

if [ "$FEHLER" = 0 ]; then echo "== Setup vollständig"; else echo "== Setup mit Fehlern – siehe Meldungen oben"; exit 1; fi
