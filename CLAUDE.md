# Lernseiten – Regeln für Claude / Claude Code

Sammel-Repository für alle digitalen Schülerangebote von Tobias (Gesamtschule Aspe, NRW): Lernseiten, Lernquizze, Lernpfade.
Veröffentlicht über GitHub Pages: `https://ideenclub.github.io/lernseiten/`

Diese Datei gilt für jede Sitzung, auch für die automatischen Läufe (geplante Aufgaben GL 7, GL 8, GL 10, WiPo 10).

## Ordnerstruktur

```
index.html                  Startseite (nicht automatisch ändern)
gl7/  gl10/  wipo10/        je eine Klassenseite
gl8-1/  gl8-2/              Klassenseiten der beiden 8er-Klassen (siehe Sonderfall GL 8)
gl8/                        gemeinsamer Baustein-Speicher für beide 8er-Klassen
planung/termine-2026-27.json  zentrale Termine (Ferien, Feiertage, bewegliche Ferientage, Halbjahr) – nur lesen, ändern nur auf Tobias' Anweisung
  index.html                Klassenseite – liest lessons.json (nicht ändern)
  lessons.json              Liste der Stunden (neuester Eintrag OBEN)
  <ordner>/index.html       eine Lernseite pro Stunde bzw. pro Baustein
  <ordner>/img/…            Bilder dieser Seite (nur rechtlich nutzbare)
```

Ordnername: `JJJJ-MM-TT-kurzthema` (Datum der Stunde, Kleinbuchstaben, Bindestriche, keine Umlaute), in GL 8 `bNN-kurzthema` (Bausteinnummer, zweistellig, z. B. `b12-dampfmaschine`).

Eintrag in `lessons.json` (am Anfang des Arrays einfügen, gültiges JSON prüfen):

```json
{"datum": "2026-11-11", "titel": "Wie arbeiten Menschen im Regenwald?", "typ": "Lernseite mit Quiz", "pfad": "2026-11-11-regenwald-arbeit/", "info": "Mi, Einzel- und Doppelstunde"}
```

Die Klassenseite hat einen festen QR-Code im Klassenraum. Neue Stunden tauchen dort automatisch oben auf.

### Sonderfall GL 8 (zwei Klassen, gleiche Inhalte)

- `gl8/` ist der Speicher für alle Bausteine (je 45 Minuten): `gl8/bNN-kurzthema/index.html`. `gl8/lessons.json` listet jeden Baustein einmal (`"titel": "Baustein 12: …"`).
- `gl8-1/` = Klassenseite der 8er-Klasse mit GL am Montag (Doppelstunde) und Donnerstag (Einzelstunde).
- `gl8-2/` = Klassenseite der 8er-Klasse mit GL am Mittwoch (Einzelstunde) und Donnerstag (Doppelstunde).
- In `gl8-1/lessons.json` und `gl8-2/lessons.json` steht pro Unterrichtstag der Klasse ein Eintrag mit dem Datum dieser Klasse; `pfad` zeigt auf den ersten Baustein der Stunde, z. B. `"../gl8/b12-dampfmaschine/"`, `info` z. B. `"Doppelstunde: Baustein 12 + 13"`.
- Folgen zwei Bausteine in einer Doppelstunde aufeinander, steht am Ende des ersten ein großer Weiter-Knopf zum nächsten. Entsteht ein Folgebaustein erst in einem späteren Lauf, wird der Weiter-Knopf im vorherigen Baustein dann ergänzt.

## Veröffentlichen

1. Nur im eigenen Klassenordner arbeiten. `index.html` im Hauptordner und die `index.html` der Klassenseiten nicht ändern.
2. `git add` nur die eigenen Dateien, Commit-Nachricht auf Deutsch, z. B. `GL 7: Lernseite Regenwald (11.11.2026)`.
3. Vor dem Push: `git fetch origin main && git rebase origin/main`. Direkt auf `main` pushen (so ist es ohne Zutun von Tobias online). Wird der Push abgelehnt: erneut fetch + rebase, höchstens dreimal.
4. URL der Seite: `https://ideenclub.github.io/lernseiten/<klasse>/<ordner>/`. GitHub Pages braucht nach dem Push etwa 1–2 Minuten.
5. QR-Code für diese URL mit Python (`pip install qrcode[pil] --break-system-packages`) erzeugen, Fehlerkorrektur M, mindestens 600 px, schwarz auf weiß.

## Datenschutz (verbindlich, öffentliches Repository)

- Keine Namen, Noten, Klassenlisten, Förderinfos oder sonstigen Schülerdaten – weder im Code noch in Dateinamen oder Commits.
- Kein Eingabefeld für Namen. Keine Formulare, die Daten an Server senden. Kein Tracking, keine Analyse-Skripte, keine Cookies.
- Keine externen Ressourcen: keine CDNs, keine Google Fonts, keine eingebetteten Fremd-Skripte. Alles (CSS, JS, Schriften) liegt in der Seite selbst. Systemschriften verwenden.
- `localStorage` nur für den Lernfortschritt auf dem eigenen iPad, Zugriffe immer in `try/catch`.
- Keine Schulbuch-Scans, keine Buchabbildungen, keine wörtlichen Buchtexte (Urheberrecht). Das Buch nur referenzieren: „Schlag im Buch S. 54 auf und sieh dir M2 an.“
- Arbeits- und Lösungsblätter (PDF) gehören NICHT ins Repository.
- Bilder nur mit klarer Lizenz (Unsplash, Wikimedia Commons mit passender Lizenz, eigene Grafiken) und mit Bildnachweis klein am Seitenende.
- Keine Hinweise auf KI-Erstellung auf der Schülerseite (Ausnahme: rechtlich vorgeschriebene Kennzeichnung KI-generierter Bilder, dann knapp in der Bildnachweiszeile).

## Gestaltung einer Lernseite

- Eine einzige, in sich geschlossene `index.html`. Optimiert für iPad (Hoch- und Querformat), große Schaltflächen (mind. 44 px), gut lesbar auch am Beamer.
- Jede Seite bekommt eine eigene, stimmige Farbwelt und ein eigenes Layout (nicht schematisch wiederholen). Modern, ruhig, verlagsnah, keine Emojis als Gestaltungsmittel.
- Aufbau einer Lernseite für selbstständiges Arbeiten:
  - kurzer, motivierender Einstieg (Frage, Foto, Fall),
  - Lerninhalte in kleinen Etappen (kurze Texte, Fotos, Schaubilder, gern einfache Animationen in CSS/SVG/Canvas),
  - nach jeder Etappe 2–4 Quizfragen mit sofortiger Rückmeldung und kurzer Erklärung,
  - Buchaufträge mit genauer Seite und Materialnummer,
  - Fortschrittsanzeige, am Ende ein Abschluss-Quiz und ein Ergebnisbildschirm („Zeig dieses Ergebnis deiner Lehrkraft“) mit Punktzahl, ohne Namen,
  - Hinweis, was auf dem Arbeitsblatt bzw. im Heft gesichert wird.
- Fragetypen mischen: Multiple Choice, Richtig/Falsch, Zuordnen (Tippen statt Ziehen ist auf dem iPad zuverlässiger), Reihenfolge, Lückentext mit Auswahl, Bild anklicken.
- Niveau und Textlänge folgen den Vorgaben der jeweiligen geplanten Aufgabe (GL 7/GL 8/WiPo 10: sehr kurze Texte, einfache Sätze; GL 10: Gesamtschulniveau).
- Nach dem Bauen: Seite lokal mit einem Headless-Browser (z. B. Playwright) in iPad-Größe (820×1180) als Screenshot prüfen, alle Quizfragen einmal durchklicken, JS-Konsole auf Fehler prüfen.
