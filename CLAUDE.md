# Lernseiten – Regeln für Claude / Claude Code

Sammel-Repository für alle digitalen Schülerangebote von Tobias (Gesamtschule Aspe, NRW): Lernseiten, Lernquizze, Lernpfade.
Veröffentlicht über GitHub Pages: `https://ideenclub.github.io/lernseiten/`

Diese Datei gilt für jede Sitzung, auch für die automatischen Läufe (geplante Aufgaben GL 7, GL 8, GL 10, WiPo 10).

## ZENTRALE REGELN FÜR ALLE KLASSEN (höchste Priorität)

Dieser Abschnitt ist die zentrale Stelle für Regeln, die Tobias für alle Klassen und Fächer festlegt. Rangfolge bei Widersprüchen:
1. dieser Abschnitt,
2. der Auftragstext der jeweiligen geplanten Aufgabe,
3. alle übrigen Abschnitte dieser Datei.

Neue oder geänderte Regeln für alle Klassen trägt Claude nur auf Tobias' ausdrücklichen Wunsch hier ein, jeweils mit „Stand <Datum>“. Ältere Regeln, die eine neue ersetzt, werden gelöscht, nicht stehen gelassen.

Hinweis: Für Dateiform der Lernseiten (eine .html-Datei direkt im Klassenordner) und das Upload-Paket bei gescheitertem Push gelten die Angaben in den geplanten Aufgaben (Stand 10.11.2026). Die älteren Angaben dazu weiter unten (Unterordner mit `index.html`, ZIP mit Klassenordner) sind überholt.

### R1 – QR-Code auf dem Arbeitsblatt (Stand 11.11.2026)

- Gibt es zu einer Stunde, Einheit oder einem Baustein eine Lernseite, ein Lernquiz oder ein anderes Online-Angebot in diesem Repository, steht der QR-Code dazu IMMER direkt auf dem Schüler-Arbeitsblatt. Die SuS mit iPad starten so sofort, Tobias muss keinen Code extra zeigen. Gibt es kein Online-Angebot, steht auf dem Blatt weder ein QR-Code noch ein Hinweis darauf.
- Zuordnung: Jedes Arbeitsblatt trägt den Code seines eigenen Online-Angebots (GL 7: Einzel- und Doppelstunden-Blatt je ihren Code, bei einer gemeinsamen Lernseite beide denselben; GL 8: jeder Baustein seinen Baustein-Code).
- Größe: klein, aber sicher scannbar – 2,0 bis 2,5 cm Kantenlänge, nie kleiner als 2 cm. Fehlerkorrektur M, schwarz auf weiß mit heller Ruhezone, ohne Logo, Farbe oder Verlauf.
- Platz: den am besten geeigneten freien Platz wählen, an dem der Code beim Austeilen sofort auffällt und nichts gequetscht wird. Erste Wahl: oben rechts im Kopfbereich neben dem Titel. Ist es dort eng: ein freier Bereich am Ende des Blatts (z. B. neben der Zusatz- bzw. Expertenaufgabe oder über der Fußzeile). Nie in Schreibfelder, nie über Text oder Bilder; Aufgaben und Schreibraum dafür nicht verdichten.
- Beschriftung direkt daneben oder darunter, kurz und passend zur Art des Angebots, z. B. „Lernseite am iPad“ oder „Quiz am iPad“, darunter klein die URL ohne „https://“ zum Abtippen.
- Mehrere Online-Angebote zur selben Einheit: je ein Code, nebeneinander, jeweils klar beschriftet.
- Der Code enthält immer die endgültige URL der Seite – auch wenn der Push scheitert (er funktioniert dann nach Tobias' Upload).
- Prüfen vor dem Ausliefern: jedes Arbeitsblatt-PDF mit mind. 200 dpi als PNG rendern, den QR-Code aus diesem Bild mit OpenCV `QRCodeDetector` auslesen; er muss exakt die URL ergeben. Sonst korrigieren.
- Abschlussnachricht: eine Zeile „QR auf dem Arbeitsblatt: ja – <Ort> (Code geprüft)“ bzw. „nein – kein Online-Angebot“.
- Der große QR-Code zum Zeigen (PNG, mind. 1200 px, im Artefakt oben) bleibt zusätzlich bestehen.

### R2 – Niveau, Zeit und Pufferaufgaben (Stand 11.11.2026)

Gilt für Arbeitsblatt, Lernseite und Quiz in GL 7, GL 8, GL 10 und WiPo 10.

**R2 ersetzt alle älteren Niveau- und Umfangsvorgaben**, egal ob sie im Auftragstext der geplanten Aufgabe (Abschnitt „NIVEAU UND UMFANG“), in den Projektanweisungen oder in der Verlaufsdatei stehen. Ungültig sind insbesondere: „höchstens Hauptschulniveau“, „lieber leicht darunter“, „Tendenz zum Hauptschulniveau“, „sehr kurze Texte (max. ca. 80–120 Wörter)“, „Komplexität geringer als bei den frühen Blättern“, feste Richtwerte wie „3 Kernaufgaben + 1 Zusatzaufgabe“ und die Prüffrage „Schafft ein leistungsschwacher Schüler jede Kernaufgabe allein? Wenn nein: kürzen“. Wo ein Auftrag „NIVEAU UND UMFANG haben Vorrang“ sagt, ist R2 gemeint. Steht in einer Verlaufsdatei noch ein Abschnitt mit älteren Niveauvorgaben, ersetze ihn beim nächsten Schreiben der Datei durch die Zeile „Niveau, Zeit, Puffer, Plan B: siehe R2 und R3 der CLAUDE.md (Stand 11.11.2026)“.

Anlass: Am 11.11.2026 waren in GL 7 die meisten SuS mit dem Einzel- und dem Doppelstunden-Blatt nach rund 10 Minuten fertig und wurden unruhig. Das Niveau war zu niedrig, der Umfang zu klein, Puffer fehlten.

**Niveau – Gesamtschule, heterogene Lerngruppe**
- Der Pflichtteil liegt auf mittlerem Niveau: Durchschnittliche SuS müssen nachdenken, schwächere schaffen ihn mit optionalen Hilfen, starke bekommen ihre Herausforderung in den Pufferaufgaben.
- Pflichtteil je Einheit: Aufgaben in AFB I, überwiegend AFB II und mindestens eine AFB-III-Aufgabe (beurteilen, begründet entscheiden, Stellung nehmen; in Jg. 7/8 mit optionaler Hilfe).
- Mindestens eine Knobelaufgabe je Einheit: Fall lösen, Widerspruch klären, Materialien vergleichen, Rangfolge begründen, Entscheidung treffen. Die Antwort darf nicht wörtlich aus einem Text abschreibbar sein.
- Materialtexte altersgemäß, keine Leichte Sprache: Jg. 7/8 ca. 120–220 Wörter je Material, Jg. 10 bis ca. 300 Wörter. Fachbegriffe einführen (Wortspeicher) und in den Antworten einfordern.
- Ankreuzen, Zuordnen und Lückentexte nur für Einstieg oder Sicherung, höchstens ein Viertel der Aufgaben. Den Kern bilden Aufgaben, die in eigenen Sätzen beantwortet werden.
- Hilfen gestuft und optional (Tipp-Kasten, Wortspeicher, Satzanfänge), getrennt von der Aufgabe, damit sie den Anspruch nicht für alle senken.
- Lernseite und Quiz: mindestens die Hälfte der Fragen verlangt Anwendung (Fall, Beispiel, Begründung), nicht nur Wiedererkennen.
- Unberührt bleibt die Portionierung: In GL 7 (kurze Konzentrationsspanne mehrerer SuS) auf der Lernseite kurze Etappen mit häufigem Wechsel (lesen – anklicken – entscheiden). Das betrifft die Form, nicht das Niveau.

**Zeit – der Kern füllt die Arbeitsphase**
- Die Kernaufgaben beschäftigen durchschnittliche SuS realistisch: Einzelstunde (45 Min.) mindestens 40 Min., Doppelstunde (90 Min.) mindestens 80 Min. (Vorgabe von Tobias, Stand 11.11.2026). Die Pufferaufgaben kommen zusätzlich dazu und zählen nicht mit.
- Weil kaum Zeit für eine lehrergeführte Phase bleibt, gehören Einstieg und Sicherung als Aufgaben aufs Blatt: Aufgabe 1 ist ein kurzer Einstieg (Foto, Fall, Frage), die letzte Kernaufgabe sichert das Ergebnis (z. B. Merksatz formulieren, Selbsttest, Kernaussage ins Heft). Beide zählen zur Arbeitszeit. Bei Doppelstunden nach ca. 40–45 Min. einen Phasenwechsel einplanen (neue Sozialform oder neues Material).
- Im Lösungsblatt bekommt jede Aufgabe einen Zeitansatz für durchschnittliche SuS des Jahrgangs (Lesen, Nachdenken, Schreiben einrechnen). Die Summe der Kernaufgaben muss im Zielbereich liegen; sonst Aufgaben ergänzen oder vertiefen, nicht nur Schreibraum vergrößern.
- Der Umfang richtet sich nach dem Zeitansatz, nicht nach einer festen Aufgabenzahl.

**Pufferaufgaben – Pflicht auf jedem Arbeitsblatt**
- Am Ende jedes Arbeitsblatts ein klar abgesetzter Bereich „Schon fertig?“ mit gestuften Zusatzaufgaben: Einzelstunde mindestens 2, Doppelstunde mindestens 3.
  - ★ Profi-Aufgabe: vertiefen oder anwenden (AFB II–III).
  - ★★ Experten-Aufgabe: Transfer, Beurteilung oder kreatives Produkt.
  - Buchauftrag ins Heft (mit kleinem Buch-Icon als Vektorgrafik, kein Emoji), ohne Platzbedarf auf dem Blatt: „Buch S. __, M__ – Aufgabe __ ins Heft.“ Nur Seiten, Materialnummern und Aufgabennummern, die genau so auf den Scans stehen. Fehlen Scans: eine Heftaufgabe ohne Buch (z. B. Mindmap, Brief, Comic, Lernplakat).
- Mindestens eine Pufferaufgabe ist zeitlich offen und kann nie ausgehen (z. B. „Schreibe 5 Quizfragen mit Lösung für deine Mitschüler“ oder ein Heftprodukt).
- Das Lösungsblatt enthält Lösungen bzw. Erwartungshorizont zu allen Pufferaufgaben.
- Die Lernseite endet ebenfalls mit „Schon fertig?“ (Bonusetappe oder Verweis auf die Pufferaufgaben des Blatts).

**Kompakter Kopf – Platz für Aufgaben**
- Kopfbereich (Titel, Fach, Name/Datum, QR-Code) höchstens ca. 3 cm hoch.
- Ein Einstiegsbild höchstens ca. ein Sechstel der Seite (z. B. volle Breite, max. ca. 4,5 cm hoch, oder schmal neben dem Text). Größer nur, wenn das Bild selbst das Arbeitsmaterial ist.
- Der gewonnene Platz geht an Aufgaben, Schreibraum und Pufferbereich. Weißraum ja, aber keine leeren Flächen ohne Funktion.

**Prüfen vor dem Ausliefern**
- Zeitansätze addieren (mit Python), Knobelaufgabe und AFB-III-Aufgabe vorhanden, Pufferbereich vollständig, Kopfhöhe im gerenderten PNG gemessen.
- Abschlussnachricht: eine Zeile „Zeit/Puffer: Kern ca. X Min. · Puffer: ★ … · ★★ … · Buch S. … (bzw. Heftaufgabe)“, bei mehreren Einheiten je Einheit.

### R3 – Selbstlaufendes Arbeitsblatt: ohne Internet, ohne iPad, mit Vertretung (Stand 11.11.2026)

Gilt für jedes Arbeitsblatt aller Klassen. Ziel: Die Stunde läuft vollständig, auch wenn das Internet ausfällt, der iPad-Wagen fehlt, ein Link nicht geht oder eine Vertretungslehrkraft ohne Vorbereitung die Stunde übernimmt.

- **Alles Nötige auf dem Blatt oder im Buch:** Jede Kernaufgabe lässt sich allein mit Arbeitsblatt, Buch (genaue Seite und Materialnummer), Heft und ggf. Atlas lösen. Nichts, was für die Kernaufgaben nötig ist, steht nur auf der Lernseite. Kein Pflichtmaterial, das nur die Fachlehrkraft hat (Video, Folie, Tafelbild).
- **Selbsterklärende Aufgaben:** Operator fett, bei neuen Aufgabenformen ein kurzes Beispiel, Sozialform als Symbol. Keine Verweise wie „wie besprochen“, „siehe Tafel“ oder „deine Lehrkraft erklärt“.
- **Ablaufzeile unter dem Titel** (eine Zeile, zählt zum Kopfbereich): z. B. „So arbeitest du: 1 → 2 → 3 → 4 → Schon fertig?“ mit grober Minutenangabe. Die SuS wissen ohne Erklärung, was zu tun ist.
- **Kasten „Kein Internet / kein iPad?“** direkt beim QR-Code (1–2 Zeilen): „Kein Problem: Bearbeite alle Aufgaben auf diesem Blatt. Statt des Online-Quiz: …“ – mit einem konkreten Ersatz, entweder einem kurzen Selbsttest auf dem Blatt (4–6 Fragen zum Ankreuzen oder Kurzantworten) oder einem Buchauftrag mit Seite und Aufgabennummer. Gibt es kein Online-Angebot, entfällt der Kasten.
- **Vertretungskasten im Lösungsblatt**, ganz oben, in einer Minute lesbar: Thema in einem Satz · austeilen · benötigt (Buch S. …, ggf. Atlas) · Ablauf in 3 Schritten mit Minuten · wer fertig ist → „Schon fertig?“-Bereich · was am Ende gesichert oder eingesammelt wird. Ohne Fachbegriffe aus der Lehrkraftplanung.
- **Prüfen vor dem Ausliefern:** Gedankenprobe „kein Internet + fachfremde Vertretung“: Kann die Klasse allein mit Blatt, Buch und Heft die ganze Stunde sinnvoll arbeiten, ohne dass jemand etwas erklärt? Wenn nein: nachbessern.
- Abschlussnachricht: eine Zeile „Plan B: ja – Offline-Ersatz für das Quiz: …, Vertretungskasten im Lösungsblatt“.

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

### Wenn der Push scheitert: Upload-Paket für Tobias (verbindlich, Stand 09.11.2026)

In den geplanten Aufgaben lehnt der Git-Proxy den Push derzeit ab (403 „not in this session's authorized repository set“). Dann lädt Tobias die Seite selbst per Browser hoch. Mach es ihm so einfach wie möglich – immer genau so:

1. **Eine Datei pro Lernseite:** Jede Lernseite ist eine einzige `index.html`. Bilder werden als `data:`-URI direkt eingebettet (JPEG, vorher auf Bildschirmgröße verkleinert, max. ca. 1600 px Breite, Qualität ca. 85). Keine `img/`-Unterordner, keine weiteren Dateien.
2. **lessons.json fertig mitliefern:** Nimm die aktuelle `lessons.json` der Klasse aus dem frisch geklonten `main`, füge den neuen Eintrag OBEN ein und prüfe das JSON (`python3 -c "import json; json.load(open(...))"`). Alte Einträge bleiben unverändert.
3. **ZIP mit der Ordnerstruktur ab Repository-Wurzel:** `<KLASSE>_Upload_<JJJJ-MM-TT>.zip` (Datum der Stunde, z. B. `GL10_Upload_2026-11-12.zip`). Inhalt: genau ein äußerer Ordner mit demselben Namen ohne `.zip`, darin der Klassenordner mit allen geänderten Dateien, z. B.
   ```
   GL10_Upload_2026-11-12/
     gl10/
       lessons.json
       2026-11-12-propaganda/index.html
   ```
   GL 8: entsprechend `gl8/bNN-…/index.html`, `gl8/lessons.json`, `gl8-1/lessons.json`, `gl8-2/lessons.json` (nur was sich ändert). Mehrere Lernseiten eines Laufs kommen in dasselbe ZIP.
4. **Vorher prüfen:** ZIP entpacken, jede `index.html` im Headless-Browser öffnen (Bilder geladen, keine Konsolenfehler), `unzip -l` kontrollieren.
5. **QR-Code zum Zeigen:** Für jede neue Lernseite zusätzlich `<KLASSE>_QR_<JJJJ-MM-TT>.png` erzeugen (mind. 1200 px, schwarz auf weiß, Fehlerkorrektur M, darunter groß die Kurz-URL und das Thema) und per `SendUserFile` (status: proactive, display: render) senden; im Artefakt den QR-Code groß (mind. 300 px breit) oben zeigen, damit Tobias ihn am Klassen-TV/Handy direkt vorzeigen kann.
6. **Ausliefern:** ZIP per `SendUserFile` (status: proactive, display: attach) und ins Artefakt des Laufs aufnehmen (Download-Link), falls das Artefakt-Tool die Datei annimmt.
7. **In der Abschlussnachricht** statt nur „NICHT online“ genau diese Zeilen:
   `Lernseite: noch nicht online – bitte hochladen (Paket <Dateiname>.zip, ca. 1 Min.):`
   `1. ZIP herunterladen und doppelklicken. 2. Im entpackten Ordner liegt der Ordner „<klasse>“. 3. github.com/Ideenclub/lernseiten öffnen (Startseite, NICHT im Klassenordner) → Add file → Upload files. 4. Den Ordner „<klasse>“ ins Feld ziehen. 5. Commit changes. Danach ist die Seite nach 1–2 Min. unter <URL> online.`

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
- Niveau, Textlänge, Zeit und Pufferaufgaben: siehe R2 (Stand 11.11.2026). Ohne Internet und mit Vertretung muss das Arbeitsblatt die Stunde tragen: siehe R3.
- Nach dem Bauen: Seite lokal mit einem Headless-Browser (z. B. Playwright) in iPad-Größe (820×1180) als Screenshot prüfen, alle Quizfragen einmal durchklicken, JS-Konsole auf Fehler prüfen.
