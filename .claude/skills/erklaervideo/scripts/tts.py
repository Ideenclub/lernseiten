#!/usr/bin/env python3
"""Vertont ein Drehbuch Satz für Satz und erzeugt daraus die Zeitsteuerung.

Aufruf (im Projektordner):
    ~/.cache/erklaervideo/venv/bin/python tts.py drehbuch.json

Erzeugt:
    public/audio/stimme.wav   Sprecherspur (48 kHz, mono)
    public/timing.json        Start/Ende jedes Satzes und jeder Szene in Frames
    untertitel.vtt            Untertitel (WebVTT), exakt aus denselben Zeiten

Drehbuch-Format (drehbuch.json):
{
  "titel": "Die Dampfmaschine",
  "fps": 30,
  "stimme": {"modell": "de_DE-thorsten-high", "tempo": 1.0},
  "vorlauf_sek": 0.6,
  "nachlauf_sek": 2.0,
  "szenen": [
    {"id": "hook", "cues": [
      {"id": "h1", "text": "Angezeigter Text / Untertitel", "sprich": "optional abweichender Sprechtext", "pause": 0.35}
    ]}
  ]
}
"tempo": >1 = langsamer (z. B. 1.08 für Klasse 6/7), <1 = schneller.
"pause": Stille nach dem Satz in Sekunden (Standard 0.3, am Szenenende 0.7).
"""
import json
import re
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

CACHE = Path.home() / ".cache" / "erklaervideo"
SR_OUT = 48000

# ---------------------------------------------------------------- Aussprache
ABKUERZUNGEN = {
    r"\bz\.\s?B\.": "zum Beispiel",
    r"\bd\.\s?h\.": "das heißt",
    r"\bu\.\s?a\.": "unter anderem",
    r"\bbzw\.": "beziehungsweise",
    r"\bca\.": "zirka",
    r"\bevtl\.": "eventuell",
    r"\bggf\.": "gegebenenfalls",
    r"\bJh\.": "Jahrhundert",
    r"\bJhd\.": "Jahrhundert",
    r"\bv\.\s?Chr\.": "vor Christus",
    r"\bn\.\s?Chr\.": "nach Christus",
    r"\bNr\.": "Nummer",
    r"\bS\.": "Seite",
    r"\busw\.": "und so weiter",
    r"\bMio\.": "Millionen",
    r"\bMrd\.": "Milliarden",
    r"\bkm/h\b": "Kilometer pro Stunde",
    r"\bkm\b": "Kilometer",
    r"\bkg\b": "Kilogramm",
    r"%": " Prozent",
    r"€": " Euro",
    r"&": " und ",
    r"\bEU\b": "E-U",
    r"\bUSA\b": "U-S-A",
    r"\bUN\b": "U-N",
    r"\bUNO\b": "Uno",
    r"\bNRW\b": "N-R-W",
    r"\bBRD\b": "B-R-D",
    r"\bDDR\b": "D-D-R",
    r"\bCO2\b": "C-O-zwei",
    r"\bCO₂\b": "C-O-zwei",
    r"\bBIP\b": "B-I-P",
    r"\bKI\b": "K-I",
    r"\bGL\b": "G-L",
}
EINER = ["", "ein", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"]
ZEHNER = ["", "zehn", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"]
SPEZIAL = {10: "zehn", 11: "elf", 12: "zwölf", 13: "dreizehn", 14: "vierzehn", 15: "fünfzehn",
           16: "sechzehn", 17: "siebzehn", 18: "achtzehn", 19: "neunzehn"}


def zahl_bis_99(n: int) -> str:
    if n == 0:
        return ""
    if n == 1:
        return "eins"
    if n in SPEZIAL:
        return SPEZIAL[n]
    z, e = divmod(n, 10)
    if e == 0:
        return ZEHNER[z]
    return f"{EINER[e]}und{ZEHNER[z]}"


def jahreszahl(n: int) -> str:
    """1769 -> siebzehnhundertneunundsechzig (übliche deutsche Sprechweise)."""
    h, r = divmod(n, 100)
    return f"{zahl_bis_99(h)}hundert{zahl_bis_99(r)}"


def sprechtext(text: str) -> str:
    t = text
    for muster, ersatz in ABKUERZUNGEN.items():
        t = re.sub(muster, ersatz, t)
    # Jahreszahlen 1100–1999 als "siebzehnhundert…" sprechen
    t = re.sub(r"\b(1[1-9]\d\d)\b", lambda m: jahreszahl(int(m.group(1))), t)
    t = t.replace("–", ",").replace("—", ",").replace("…", ".")
    t = re.sub(r"\s+", " ", t).strip()
    return t


def warnungen(cue_id: str, t: str) -> None:
    if re.search(r"\d", t):
        print(f"  ! {cue_id}: Ziffern im Sprechtext – Aussprache prüfen oder ausschreiben: {t}")
    for m in re.findall(r"\b[A-ZÄÖÜ]{2,}\b", t):
        print(f"  ! {cue_id}: Abkürzung '{m}' – ggf. in 'sprich' ausschreiben")


# ---------------------------------------------------------------- Audio
def trimmen(a: np.ndarray, sr: int, schwelle=0.012, rand=0.04) -> np.ndarray:
    idx = np.where(np.abs(a) > schwelle)[0]
    if len(idx) == 0:
        return a
    s = max(0, idx[0] - int(rand * sr))
    e = min(len(a), idx[-1] + int(rand * sr))
    a = a[s:e].copy()
    f = int(0.01 * sr)
    a[:f] *= np.linspace(0, 1, f)
    a[-f:] *= np.linspace(1, 0, f)
    return a


def main() -> None:
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    pfad = Path(sys.argv[1]).resolve()
    projekt = pfad.parent
    db = json.loads(pfad.read_text(encoding="utf-8"))
    fps = int(db.get("fps", 30))
    st = db.get("stimme", {})
    modell = st.get("modell", "de_DE-thorsten-high")
    tempo = float(st.get("tempo", 1.0))

    from piper import PiperVoice, SynthesisConfig

    onnx = CACHE / "stimmen" / f"{modell}.onnx"
    if not onnx.exists():
        sys.exit(f"Stimme fehlt: {onnx} – zuerst setup.sh ausführen.")
    stimme = PiperVoice.load(str(onnx))
    cfg = SynthesisConfig(length_scale=tempo, noise_scale=0.6, noise_w_scale=0.75)
    sr = stimme.config.sample_rate

    vorlauf = float(db.get("vorlauf_sek", 0.6))
    nachlauf = float(db.get("nachlauf_sek", 2.0))
    teile = [np.zeros(int(vorlauf * sr), dtype=np.float32)]
    t = vorlauf
    cues_out: dict = {}
    szenen_roh: list = []
    vtt_bloecke: list = []

    for si, sz in enumerate(db["szenen"]):
        erster, letzter = None, None
        for ci, cue in enumerate(sz["cues"]):
            sprich = sprechtext(cue.get("sprich") or cue["text"])
            warnungen(cue["id"], sprich)
            audio = np.concatenate(
                [ch.audio_float_array for ch in stimme.synthesize(sprich, syn_config=cfg)]
            ).astype(np.float32)
            audio = trimmen(audio, sr)
            dauer = len(audio) / sr
            start, ende = t, t + dauer
            teile.append(audio)
            ist_letzter = ci == len(sz["cues"]) - 1
            pause = float(cue.get("pause", 0.7 if ist_letzter else 0.3))
            teile.append(np.zeros(int(pause * sr), dtype=np.float32))
            t = ende + pause
            cues_out[cue["id"]] = {
                "start": round(start * fps),
                "end": round(ende * fps),
                "text": cue["text"],
                "szene": sz["id"],
                "start_sek": round(start, 3),
                "ende_sek": round(ende, 3),
            }
            vtt_bloecke.append((start, ende, cue.get("untertitel") or cue["text"]))
            erster = erster if erster is not None else start
            letzter = ende
        szenen_roh.append((sz["id"], erster, letzter))

    teile.append(np.zeros(int(nachlauf * sr), dtype=np.float32))
    gesamt = np.concatenate(teile)
    gesamt_sek = len(gesamt) / sr
    gesamt_frames = int(np.ceil(gesamt_sek * fps))

    # Szenengrenzen: Mitte der Pause zwischen zwei Szenen
    szenen = {}
    for i, (sid, a, e) in enumerate(szenen_roh):
        start = 0 if i == 0 else round(((szenen_roh[i - 1][2] + a) / 2) * fps)
        ende = gesamt_frames if i == len(szenen_roh) - 1 else round(((e + szenen_roh[i + 1][1]) / 2) * fps)
        szenen[sid] = {"start": start, "end": ende}

    (projekt / "public" / "audio").mkdir(parents=True, exist_ok=True)
    roh = projekt / "public" / "audio" / "stimme_roh.wav"
    with wave.open(str(roh), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(sr)
        w.writeframes((np.clip(gesamt, -1, 1) * 32767).astype(np.int16).tobytes())
    ziel = projekt / "public" / "audio" / "stimme.wav"
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(roh), "-af",
         "highpass=f=70,acompressor=threshold=-20dB:ratio=2.5:attack=5:release=80,aresample=48000:resampler=soxr",
         "-ar", str(SR_OUT), "-ac", "1", str(ziel)],
        check=True,
    )
    roh.unlink()

    timing = {
        "fps": fps, "breite": 1920, "hoehe": 1080,
        "gesamtFrames": gesamt_frames, "gesamtSek": round(gesamt_sek, 2),
        "cues": cues_out, "szenen": szenen, "reihenfolge": [s["id"] for s in db["szenen"]],
    }
    (projekt / "public" / "timing.json").write_text(json.dumps(timing, ensure_ascii=False, indent=1), encoding="utf-8")

    # ---- WebVTT: max. 2 Zeilen à 42 Zeichen, lange Sätze auf mehrere Blöcke verteilt
    def ts(x: float) -> str:
        h, r = divmod(x, 3600)
        m, s = divmod(r, 60)
        return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"

    def zeilen(text: str, breite=42) -> list:
        woerter, out, akt = text.split(), [], ""
        for w in woerter:
            if len(akt) + len(w) + 1 > breite and akt:
                out.append(akt)
                akt = w
            else:
                akt = f"{akt} {w}".strip()
        if akt:
            out.append(akt)
        return out

    vtt = ["WEBVTT", ""]
    n = 1
    for a, e, text in vtt_bloecke:
        z = zeilen(text)
        gruppen = [z[i:i + 2] for i in range(0, len(z), 2)]
        laengen = [sum(len(x) for x in g) for g in gruppen]
        summe = sum(laengen)
        t0 = a
        for k, (g, l) in enumerate(zip(gruppen, laengen)):
            t1 = t0 + (e - a) * l / summe
            halt = 0.2 if k == len(gruppen) - 1 else 0.0
            vtt += [str(n), f"{ts(t0)} --> {ts(t1 + halt)}", "\n".join(g), ""]
            n += 1
            t0 = t1
    (projekt / "untertitel.vtt").write_text("\n".join(vtt), encoding="utf-8")

    print(f"Fertig: {gesamt_sek:.1f} s, {gesamt_frames} Frames, {len(cues_out)} Sätze, {len(szenen)} Szenen")
    for sid, s in szenen.items():
        print(f"  Szene {sid:<14} {s['start']/fps:6.2f}–{s['end']/fps:6.2f} s")


if __name__ == "__main__":
    main()
