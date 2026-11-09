---
name: erklaervideo
description: Erstellt ein professionelles Erklärvideo (MP4 1080p mit deutscher Sprecherstimme, Untertiteln, Vorschaubild) für Tobias' Unterricht (GL 6–8, WiPo 10, Sport; Gesamtschule NRW) und veröffentlicht es mit eigener Seite und zwei QR-Codes auf GitHub Pages. Verwenden, wenn Tobias ein Erklärvideo, Lernvideo, Video zu einem Thema oder „erklaervideo“ in Auftrag gibt.
---

# Erklärvideo für den Unterricht

Jedes Video ist ein Einzelauftrag von Tobias (Lerngruppe, Thema, Stunde). Ziel: ein Video, das sich nicht von professionellen Erklärformaten auf YouTube oder aus dem öffentlich-rechtlichen Angebot unterscheiden lässt, ohne deren Logos, Figuren, Namen oder Designs zu übernehmen.

Tobias ist technischer Anfänger und arbeitet im Browser (PC und Handy). Jede Handlung, die er selbst ausführen muss, in einfachen Schritten erklären. Alles, was Geld kostet oder ein Konto bzw. einen API-Schlüssel braucht, vorher erfragen.

Werkzeuge in diesem Ordner:

| Datei | Zweck |
|---|---|
| `scripts/setup.sh` | installiert bei Bedarf ffmpeg, Piper-Stimme, QR-Bibliothek (idempotent, ca. 1 Min. beim ersten Mal) |
| `scripts/neues_video.sh <ordner>` | legt den Arbeitsordner `~/erklaervideo-arbeit/<ordner>` aus der Vorlage an |
| `scripts/tts.py drehbuch.json` | vertont Satz für Satz, erzeugt `public/timing.json` und `untertitel.vtt` |
| `scripts/render.sh <Dateiname>` | rendert Video + Vorschaubild, ruft `finalisieren.py` auf |
| `scripts/finalisieren.py` | Lautheit −16 LUFS, H.264/AAC, < 45 MB, Prüfbericht |
| `scripts/commons.py` | Wikimedia-Commons-Suche und Download mit Lizenzdaten |
| `scripts/qr.py <URL> <png>` | QR-Code (Fehlerkorrektur M, ≥ 600 px, schwarz auf weiß) |
| `vorlage/` | Remotion-Projekt (Zeitsteuerung, Kamerafahrt, Übergänge, Schriften) |
| `seite/index.html` | Vorlage der Videoseite |
| `designlog.md` | bereits verwendete Designkonzepte – vor jedem neuen Video lesen, danach ergänzen |
| `archiv/<ordner>/` | Drehbuch und Szenen-Code jedes Videos (für spätere Korrekturen) |

Python-Skripte mit `~/.cache/erklaervideo/venv/bin/python` starten (außer `finalisieren.py`, das läuft mit `python3`).

## Ablauf bei jedem Auftrag

### 1. Auftrag klären
- Klasse, Fach, Thema, Stunde/Datum, Lernziel. Fehlt etwas Wesentliches, einmal gebündelt nachfragen.
- Lehrplanbezug kurz prüfen (gültiger Kernlehrplan NRW für die Gesamtschule im jeweiligen Fach, bei Unsicherheit auf schulentwicklung.nrw.de nachsehen). Passt das Thema nicht zur Klasse, einmal kurz darauf hinweisen, dann weiterarbeiten.
- Zielklasse festlegen und daraus ableiten:

| Klasse | Sprache | Tempo (`stimme.tempo`) | Beispiele, Humor |
|---|---|---|---|
| 6–7 | kurze Hauptsätze (≤ 12 Wörter), jedes Fachwort sofort erklärt | 1.06–1.10 (langsamer) | Schulweg, Familie, Freizeit, Haustier; freundlich-verspielt, nicht kindlich |
| 8–9 | Ursache → Wirkung, erste Fachsprache | 1.00–1.04 | Handy, Verein, Ausbildung der Geschwister, Region (Ruhrgebiet, NRW) |
| 10 | Fachbegriffe, Perspektiven, Kontroversen | 0.96–1.00 | Ausbildung, erstes Gehalt, Miete, Wahlen, Social Media; trockener Humor |

- Heterogene Lerngruppe: Kernaussage so einfach, dass schwächere Schüler sie mitnehmen; ein „Profi-Detail“ pro Abschnitt für Stärkere (z. B. als kleine Einblendung).
- Prüffragen vor dem Drehbuch: Spricht das Jugendliche dieses Alters an? Stammen die Beispiele aus ihrer Lebenswelt? Zu kindlich oder zu schwer? Bei Zweifel nachbessern.

### 2. Drehbuch schreiben und freigeben lassen
- Länge: Standard 2–3 Minuten, höchstens 4. Faustregel Piper-Stimme (Tempo 1.0, gemessen): ca. 2,3 Wörter pro Sekunde einschließlich Pausen. 2:30 Min. ≈ 340 Wörter; Klasse 6/7 (langsamer, mehr Pausen) ≈ 290 Wörter.
- Dramaturgie (verbindlich):
  1. Hook in den ersten 5–10 s (Frage, überraschender Fakt, Alltagsbezug).
  2. Leitfrage groß einblenden (und sprechen).
  3. 2–4 Abschnitte mit Zwischenüberschrift, je ein klares Bild/Schaubild.
  4. Ende: „Kurz gemerkt“ mit genau 3 Kernpunkten + eine Denkfrage an die Klasse.
- Fachlich: Jede Zahl, Jahreszahl und jeden Namen prüfen (Websuche, mehrere seriöse Quellen). Keine Vereinfachung, die falsch wird. Lieber „viel weniger“ als eine unsichere Prozentzahl.
- Politik/Gesellschaft: Beutelsbacher Konsens – kein Überwältigen, Kontroverses kontrovers darstellen, Schüler zur eigenen Urteilsbildung befähigen. Positionen von Parteien/Gruppen ausgewogen und mit Quelle.
- Tobias das Drehbuch zur Freigabe zeigen: Tabelle mit Szene | Sprechertext | Was man sieht | Dauer (geschätzt). Erst nach Freigabe rendern. (Die Freigabe ist zugleich die redaktionelle Kontrolle durch einen Menschen.)
- Drehbuch als `drehbuch.json` anlegen (Format im Kopf von `scripts/tts.py`). Jeder Satz ist ein „Cue“ mit eigener `id`; Animationen hängen an diesen IDs.
  - `text` = angezeigter Text/Untertitel, `sprich` = abweichender Sprechtext (nur wenn nötig).
  - Abkürzungen und Zahlen deutsch aussprechen: `tts.py` ersetzt gängige Abkürzungen (z. B., EU, USA, NRW, %, €, CO2 …) und spricht Jahreszahlen 1100–1999 als „siebzehnhundertneunundsechzig“. Alles, wofür `tts.py` eine Warnung ausgibt, in `sprich` ausschreiben (z. B. „50.000“ → „fünfzigtausend“, „DGB“ → „D-G-B“, „Mio.“ wird automatisch zu „Millionen“).

### 3. Neues Designkonzept festlegen
- `designlog.md` lesen. Das neue Konzept muss sich in **allen** Punkten vom letzten und in mindestens fünf Punkten von jedem früheren unterscheiden:
  Farbpalette (4–5 Farben, Kontrast ≥ 4.5:1 für Text), Hintergrund (dunkel/hell/Papier/Foto/Verlauf/Textur), Titelschrift + Textschrift, Formensprache (eckig/rund/handgezeichnet/geometrisch), Übergangsart, Layout-Raster, Icon-Bibliothek und -Stil, Bewegungscharakter (federnd/präzise/weich).
- Schriften: nur OFL-Schriften über `npm install @fontsource/<name>` (z. B. Archivo, Bricolage Grotesque, DM Serif Display, Fraunces, Oswald, Space Grotesk, Sora, Outfit, Rubik, Manrope, Playfair Display, Anton, Familjen Grotesk, Instrument Sans). Prüfen, dass die Schrift „latin“ mit Umlauten enthält.
- Icons: `@tabler/icons-react` (Linie), `@phosphor-icons/react` (sechs Stile: thin, light, regular, bold, fill, duotone), `lucide-react` (Linie, rund) – pro Video nur eine Bibliothek/ein Stil.
- Übergänge (`src/lib/uebergang.tsx`): blende, wischen, diagonal, kreis, schieben, zoom, streifen, schnitt – eine Hauptart pro Video, höchstens eine Akzent-Variante.
- Karten: `world-atlas` + `d3-geo` (Natural Earth, gemeinfrei). Für Bundesländer/Regionen eigene vereinfachte SVG-Skizzen.
- Konzept in 4–6 Zeilen festhalten (Kommentarkopf in `src/szenen/index.tsx`) und nach dem Video in `designlog.md` eintragen.

### 4. Produktion

```bash
SK=/home/user/lernseiten/.claude/skills/erklaervideo     # Pfad ggf. an das Repository anpassen
bash $SK/scripts/setup.sh
W=$(bash $SK/scripts/neues_video.sh <ordner>)            # z. B. gl8-dampfmaschine
cd $W
# drehbuch.json schreiben, dann:
~/.cache/erklaervideo/venv/bin/python tts.py drehbuch.json
```

**Bilder** (feste Reihenfolge, jedes Bild nach `public/bilder/`):
1. Echte Fotos: Unsplash-Connector (`search_photos` mit `per_page` 5–8, `plus: "none"`, `orientation: "landscape"`; dann `download_asset`, die gelieferte URL mit `&w=2880` per `curl` laden). Unsplash-Lizenz: frei nutzbar, Fotograf trotzdem nennen.
2. Reale Orte, Gebäude, Personen, historische Ereignisse: Wikimedia Commons über `scripts/commons.py suche "…"` und `… laden "File:…" ziel.jpg 2400`. Nur Public Domain, CC0, CC BY. CC BY-SA nur, wenn es keine Alternative gibt (dann in `quellen.md` vermerken, dass das Video unter CC BY-SA 4.0 steht). Motiv anhand der Dateibeschreibung eindeutig prüfen. Keine GFDL-only- oder NC-Lizenzen.
3. Allgemeine Motive ohne realen Bezug, für die es kein passendes Foto gibt: fotorealistische KI-Bilder – nur nach Rückfrage bei Tobias, weil die Dienste ein Konto und meist Guthaben brauchen. Nie für reale konkrete Orte, Gebäude oder Personen.
4. Eigene Grafiken (SVG im Code) nur für Diagramme, Schaubilder, Zeitleisten, Kartenskizzen.
- Keine Abbildungen oder wörtlichen Texte aus Schulbüchern.
- Mindestens 1920 px Breite für Vollbild; kleinere Bilder nur in Teilflächen. Jedes Bild vor dem Rendern ansehen (Kontaktbogen mit ffmpeg, dann Read): Schärfe, Ausschnitt, Wasserzeichen, störende moderne Details, Passung zum Satz.
- Scheitert ein Download an einer gesperrten Adresse (Ablehnung durch den Netzwerk-Proxy): Tobias die genaue Adresse nennen (Hostname, z. B. `upload.wikimedia.org`) und die Freigabe über die Umgebungs-Werkzeuge vorschlagen (`get_environment`, dann `update_environment` mit genau diesem Host); er bestätigt nur noch. Anleitung für Hand-Freigabe steht in `LIESMICH.md`. Wikimedia antwortet bei vielen Anfragen mit 429 – `commons.py` wartet dann automatisch.

**Szenen** in `src/szenen/index.tsx` frei gestalten. Pflicht-Exporte: `SZENEN` (ein Component pro Szenen-ID aus dem Drehbuch), `UEBERGANG`, `HINTERGRUND`, `MUSIK`, `Vorschaubild`. Hilfen:
- `imSzene('szene', 'cueId', versatzSek)` → Startframe eines Satzes innerhalb der Szene (Animation genau dann starten, wenn der Satz beginnt).
- `wortStart('cueId', wortIndex) - timing.szenen.<szene>.start` → Startframe eines einzelnen Wortes (geschätzt) für kinetische Typografie.
- `<Kamerafahrt datei="bilder/x.jpg" …/>` für Fotos mit Zoom/Schwenk.
- `ladeSchrift()` für Fontsource-Schriften.
- Gestaltungsregeln: viel Bild, wenig Text; jede Aussage visuell gestützt; Titel ≥ 90 px, Fließtext ≥ 44 px, Beschriftungen ≥ 36 px (1080p); starker Kontrast; Text mindestens 2 s stehen lassen; Bewegung nie ohne Grund; ruhige Kamerafahrten (Zoom 1.0–1.25).
- Ein zweites Remotion-Projekt (`archiv/gl8-dampfmaschine-probe/`) zeigt, wie Szenen gebaut werden. Nur die Technik übernehmen, nicht das Aussehen.

**Prüfen vor dem Rendern** (Standbilder, halbe Auflösung):
```bash
npx remotion still Video pruefung/f300.jpg --frame=300 --scale=0.5 --log=error
```
Aus jeder Szene mindestens ein Standbild ansehen (zu Kontaktbögen zusammenfügen). Überlappungen, abgeschnittene Texte, zu kleine Schrift korrigieren.

**Rendern:**
```bash
bash $SK/scripts/render.sh Klasse<N>_<Thema>_<JJJJ-MM-TT>     # z. B. Klasse8_Dampfmaschine_2026-11-09
```
Dauer: ca. 4 s Rechenzeit pro Videosekunde (3 Min. ≈ 12 Min.). Bei langen Videos im Hintergrund starten. Bash-Zeitlimit beachten.

**Prüfbericht** (`finalisieren.py` gibt ihn aus) und Sichtprüfung:
- Länge im Rahmen, Datei < 50 MB, 1920×1080, 30 fps, H.264 High, AAC, Lautheit ≈ −16 LUFS.
- Synchronität: 10–12 Einzelbilder genau zu Satzanfängen aus der fertigen MP4 ziehen (`ffmpeg -ss <start_sek+0.4> …`, Startzeiten aus `public/timing.json`) und prüfen, dass das Gezeigte zum gesprochenen Satz passt.
- Lesbarkeit am Beamer: Text auf Standbildern bei 50 % Größe noch gut lesbar?

**Musik** (optional): nur gemeinfreie oder klar lizenzfreie Stücke mit dokumentierter Lizenz, Lautstärke 0.06–0.10 (`MUSIK` in den Szenen). Ohne passende Quelle lieber ohne Musik.

### 5. Veröffentlichen
Ordner im Repository: `videos/<klasse>-<kurzthema>/` (Kleinbuchstaben, Bindestriche, keine Umlaute, z. B. `videos/wipo10-mindestlohn/`). Inhalt:
- `Klasse<N>_<Thema>_<Datum>.mp4`, `untertitel.vtt`, `vorschau.jpg`
- `index.html` aus `seite/index.html`: Platzhalter ersetzen, Farben in `:root` an die Video-Palette anpassen. Bildnachweis klein im Footer (Pflicht bei CC BY).
- `qr-seite.png` (→ `https://ideenclub.github.io/lernseiten/videos/<ordner>/`) und `qr-video.png` (→ direkt auf die MP4) mit `scripts/qr.py`.
- `quellen.md`: alle Bilder (Urheber, Link, Lizenz), Schriften, Stimme, Musik, fachliche Grundlage.
- Seite lokal prüfen (Playwright, 820×1180, Konsole fehlerfrei, keine externen Anfragen, Untertitel-Knopf).
- Arbeitsdateien archivieren: `drehbuch.json`, `src/szenen/`, Bildliste nach `.claude/skills/erklaervideo/archiv/<ordner>/` (keine Bilder, kein node_modules). `designlog.md` ergänzen.
- Commit (deutsch, z. B. `GL 8: Erklärvideo Dampfmaschine (09.11.2026)`) und Push nach den Regeln in `CLAUDE.md` (fetch + rebase, direkt auf `main`). Gibt die Sitzung einen eigenen Arbeitszweig vor und hat Tobias in diesem Auftrag nicht ausdrücklich „direkt auf main“ gesagt: auf den Arbeitszweig pushen und ihm sagen, dass er noch mergen muss (Anleitung in `LIESMICH.md`).
- Speicherplatz: `du -sh videos` prüfen. GitHub Pages empfiehlt höchstens 1 GB pro Website; ab 700 MB Tobias warnen und vorschlagen, alte Videos zu entfernen.
- Auf Wunsch einen Eintrag in der passenden `lessons.json` der Klasse ergänzen (`"typ": "Erklärvideo"`, `"pfad": "../videos/<ordner>/"`).

### 6. Rückmeldung an Tobias
Kurz und vollständig:
- Link zur Seite, Direktlink zur MP4 (zum Speichern auf dem iPad: Link in Safari öffnen → Teilen → „In Dateien sichern“), Ort der beiden QR-Codes im Repository.
- Ob er noch mergen muss (und wie) oder ob es in 1–2 Minuten online ist.
- Länge, Dateigröße, Stimme.
- Wo keine Fotos eingebaut werden konnten und warum.
- Hinweise auf Lehrplan-Abweichungen, Datenschutz oder Lizenzfragen.
- Angebot: kurzes Quiz zum Video für die Lernseite (5–8 Fragen, gemischte Typen nach `CLAUDE.md`).

## Sprecherstimme
- Standard: Piper, Stimme `de_DE-thorsten-high` (kostenlos, läuft lokal, Trainingsdaten CC0). Klingt klar und gut verständlich, aber hörbar synthetisch.
- Hochwertigere Neural-Stimmen (z. B. Azure Speech, Google Cloud Text-to-Speech, ElevenLabs) brauchen Konto und API-Schlüssel und kosten je nach Menge Geld → nur nach Rückfrage. Den Schlüssel nie im Chat erfragen, sondern über die sichere Schlüsselabfrage der Umgebung einrichten lassen.
- Keine Stimmen bekannter Personen nachahmen, kein Stimmklonen.

## Recht und Datenschutz
- Öffentliches Repository: keine Schülerdaten, keine Namen, keine Noten. Keine YouTube-Einbettung, kein Tracking, keine externen Skripte/Schriften auf der Seite. Das Video liegt direkt auf GitHub Pages.
- Hinweis zu GitHub Pages (bei Bedarf erwähnen): GitHub verarbeitet beim Abruf technisch die IP-Adresse; das gilt für alle Lernseiten des Repositorys gleichermaßen.
- Im Video und auf der Seite kein Hinweis auf KI oder Werkzeuge. **Ausnahme:** Werden fotorealistische KI-Bilder verwendet, die echt wirken könnten, verlangt Art. 50 Abs. 4 KI-Verordnung (gilt seit 2. August 2026) eine Kennzeichnung. Dann im Video dezent am Bild „KI-generiertes Bild“ (klein, Ecke) und im Bildnachweis der Seite. Tobias darauf hinweisen.
- Lizenzen von Bildern, Musik, Stimme und Schriften in `quellen.md` dokumentieren, nicht im Video.
- Remotion (Render-Software) ist für Einzelpersonen und gemeinnützige Organisationen kostenlos; für Unterrichtsvideos einer Lehrkraft fällt keine Lizenzgebühr an.
- Datenschutzprobleme (z. B. erkennbare Schüler auf Fotos, Namen in Materialien, Dienste mit Datenerfassung) immer von selbst ansprechen.
