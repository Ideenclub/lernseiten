#!/usr/bin/env python3
"""Finale Fassung: Lautheit normalisieren (EBU R128, -16 LUFS), H.264/AAC, < 45 MB, Web-optimiert.
Aufruf: finalisieren.py roh.mp4 ziel.mp4
"""
import json
import re
import subprocess
import sys
from pathlib import Path

MAX_MB = 45.0  # Sicherheitsabstand zur 50-MB-Grenze von GitHub
LUFS, TP, LRA = -16, -1.5, 11


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, **kw)


def dauer(p):
    r = run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)])
    return float(r.stdout.strip())


def main():
    roh, ziel = Path(sys.argv[1]), Path(sys.argv[2])
    # 1. Lautheit messen
    r = run(["ffmpeg", "-hide_banner", "-i", str(roh), "-af",
             f"loudnorm=I={LUFS}:TP={TP}:LRA={LRA}:print_format=json", "-f", "null", "-"])
    m = json.loads(re.findall(r"\{[^{}]*\}", r.stderr, re.S)[-1])
    af = (f"loudnorm=I={LUFS}:TP={TP}:LRA={LRA}:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:"
          f"linear=true,aresample=48000")
    basis = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(roh)]
    v = ["-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-level", "4.1", "-pix_fmt", "yuv420p",
         "-r", "30", "-s", "1920x1080", "-g", "60", "-movflags", "+faststart"]
    a = ["-af", af, "-c:a", "aac", "-b:a", "160k", "-ar", "48000"]
    # 2. Qualitätsbasiert kodieren
    run(basis + v + ["-crf", "21", "-maxrate", "6M", "-bufsize", "12M"] + a + [str(ziel)], check=True)
    mb = ziel.stat().st_size / 1e6
    # 3. Zu groß? Zwei-Pass mit berechneter Bitrate
    if mb > MAX_MB:
        d = dauer(roh)
        kbit = int((MAX_MB * 8000 / d) - 160 - 50)
        print(f"  {mb:.1f} MB zu groß – zweiter Durchgang mit {kbit} kbit/s")
        log = str(ziel.with_suffix(""))
        run(basis + v + ["-b:v", f"{kbit}k", "-pass", "1", "-passlogfile", log, "-an", "-f", "mp4", "/dev/null"], check=True)
        run(basis + v + ["-b:v", f"{kbit}k", "-pass", "2", "-passlogfile", log] + a + [str(ziel)], check=True)
        for f in Path(ziel.parent).glob(Path(log).name + "*.log*"):
            f.unlink()
        mb = ziel.stat().st_size / 1e6
    # 4. Prüfbericht
    info = json.loads(run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(ziel)]).stdout)
    vs = next(s for s in info["streams"] if s["codec_type"] == "video")
    au = next(s for s in info["streams"] if s["codec_type"] == "audio")
    r2 = run(["ffmpeg", "-hide_banner", "-i", str(ziel), "-af", "ebur128=peak=true", "-f", "null", "-"])
    lufs = re.findall(r"I:\s+(-?[\d.]+) LUFS", r2.stderr)
    print(json.dumps({
        "datei": ziel.name,
        "groesse_mb": round(mb, 1),
        "dauer_sek": round(float(info["format"]["duration"]), 1),
        "video": f"{vs['codec_name']} {vs['width']}x{vs['height']} {vs['r_frame_rate']} fps",
        "audio": f"{au['codec_name']} {au['sample_rate']} Hz",
        "lautheit_lufs": float(lufs[-1]) if lufs else None,
        "unter_50mb": mb < 50,
    }, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
