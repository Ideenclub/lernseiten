# Lernseiten – Regeln für Claude / Claude Code

Sammel-Repository für alle digitalen Schülerangebote von Tobias (Gesamtschule Aspe, NRW): Lernseiten, Lernquizze, Lernpfade.
Veröffentlicht über GitHub Pages: `https://ideenclub.github.io/lernseiten/`

Diese Datei gilt für jede Sitzung, auch für die automatischen Läufe (geplante Aufgaben GL 7, GL 8a, GL 8e, GL 10, WiPo 10).

## ZENTRALE REGELN FÜR ALLE KLASSEN (höchste Priorität)

Dieser Abschnitt ist die zentrale Stelle für Regeln, die Tobias für alle Klassen und Fächer festlegt. Rangfolge bei Widersprüchen:
1. dieser Abschnitt,
2. der Auftragstext der jeweiligen geplanten Aufgabe,
3. alle übrigen Abschnitte dieser Datei.

Neue oder geänderte Regeln für alle Klassen trägt Claude nur auf Tobias' ausdrücklichen Wunsch hier ein, jeweils mit „Stand <Datum>“. Ältere Regeln, die eine neue ersetzt, werden gelöscht, nicht stehen gelassen.

Hinweis: Dateiform der Lernseiten (Stand 10.11.2026): Jede neue Lernseite ist EINE Datei direkt im Klassenordner (`gl7/<JJJJ-MM-TT-kurzthema>.html`, in GL 8 `gl8/bNN-kurzthema.html`), Bilder als data:-URI eingebettet; in lessons.json ist „pfad“ der Dateiname. Hochladen nur noch über R14 (Übergabe). Die älteren Angaben weiter unten (Unterordner mit `index.html`, Upload-ZIP) sind überholt.

### R1 – QR-Code auf dem Arbeitsblatt (Stand 11.11.2026)

- Gibt es zu einer Stunde, Einheit oder einem Baustein eine Lernseite, ein Lernquiz oder ein anderes Online-Angebot in diesem Repository, steht der QR-Code dazu IMMER direkt auf dem Schüler-Arbeitsblatt. Die SuS mit iPad starten so sofort, Tobias muss keinen Code extra zeigen. Gibt es kein Online-Angebot, steht auf dem Blatt weder ein QR-Code noch ein Hinweis darauf.
- Zuordnung: Jedes Arbeitsblatt trägt den Code seines eigenen Online-Angebots (GL 7: Einzel- und Doppelstunden-Blatt je ihren Code, bei einer gemeinsamen Lernseite beide denselben; GL 8: jeder Baustein seinen Baustein-Code).
- Größe (Stand 12.11.2026, wegen Seitenlimit R9): klein, aber sicher scannbar – 1,5 bis 1,8 cm Kantenlänge, nie kleiner als 1,5 cm. Fehlerkorrektur M, schwarz auf weiß mit heller Ruhezone (mind. 2 Module), ohne Logo, Farbe oder Verlauf. Dateinamen der Lernseiten kurz halten (kurze URL = weniger Module = besser scannbar).
- Platz: oben rechts im Kopfbereich neben dem Titel, sodass der Code keine eigene Zeile und keine zusätzliche Höhe braucht (Kopf höchstens 3 cm, R9). Ist es dort eng: ein freier Bereich am Ende des Blatts (z. B. neben „Schon fertig?“ oder über der Fußzeile). Nie in Schreibfelder, nie über Text oder Bilder.
- Beschriftung direkt daneben, eine kurze Zeile, z. B. „Lernseite am iPad“ oder „Quiz am iPad“, darunter klein (7 pt) die URL ohne „https://“ zum Abtippen.
- Mehrere Online-Angebote zur selben Einheit: je ein Code, nebeneinander, jeweils klar beschriftet.
- Der Code enthält immer die endgültige URL der Seite – auch wenn der Push scheitert (er funktioniert dann nach Tobias' Upload).
- Prüfen vor dem Ausliefern: jedes Arbeitsblatt-PDF mit mind. 200 dpi als PNG rendern, den QR-Code aus diesem Bild mit OpenCV `QRCodeDetector` auslesen; er muss exakt die URL ergeben. Zusätzlich Kopierprobe: dieselbe Seite mit 300 dpi in Graustufen rendern, Kontrast abschwächen (Pixelwert × 0,8 + 40, wie eine blasse Kopie), mit Gauß-Radius 1,5 px weichzeichnen und erneut auslesen (Praxistest 12.11.2026: im gerenderten Blatt bestand erst 1,8 cm sicher – im Zweifel 1,8 cm nehmen). Scheitert eine Probe: URL kürzen oder den Code auf 1,8–2,0 cm vergrößern, dann neu prüfen.
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
- **Hilfen für Schwächere, ohne die Starken zu bremsen:**
  - Zu jeder Kernaufgabe mit Schreib- oder Denkanteil gibt es mindestens eine Hilfe, gestuft: Tipp 1 = Denkanstoß (Frage, Hinweis auf die Textstelle), Tipp 2 = Wortspeicher oder Satzanfänge, Tipp 3 = Beispiel oder Struktur (z. B. Tabelle vorgegeben, erster Satz vorgeschrieben).
  - Die Hilfen stehen getrennt von der Aufgabe (Randspalte, Tippkasten am Seitenende oder umgedreht unten auf der Seite), nie in die Aufgabe eingebaut. Wer sie nicht braucht, sieht die Aufgabe in voller Schwierigkeit. Auf dem Blatt kurz: „Tipps nur nutzen, wenn du nicht weiterkommst.“
  - Lesehilfen bei Materialtexten: Zeilennummern, Absätze, schwierige Wörter am Rand erklärt.
  - Für Starke: Kernaufgaben haben eine offene Spitze (begründen, Gegenbeispiel finden, abwägen), sodass gute Antworten weiter gehen können als die Mindestlösung. Dazu die gestuften Pufferaufgaben (★/★★).
  - Prüffrage je Kernaufgabe: Welche Hilfe hat ein schwacher Schüler hier? Was fordert einen starken Schüler hier noch? Fehlt eine der beiden Antworten: nachbessern.
- Lernseite und Quiz: mindestens die Hälfte der Fragen verlangt Anwendung (Fall, Beispiel, Begründung), nicht nur Wiedererkennen.
- Unberührt bleibt die Portionierung: In GL 7 (kurze Konzentrationsspanne mehrerer SuS) auf der Lernseite kurze Etappen mit häufigem Wechsel (lesen – anklicken – entscheiden). Das betrifft die Form, nicht das Niveau.

**Zeit – das Blatt füllt die Stunde**
- Vorgabe von Tobias (Stand 11.11.2026): Das Arbeitsblatt füllt eine Einzelstunde (45 Min.) mindestens 40 Min. und eine Doppelstunde (90 Min.) mindestens 80 Min. – für ALLE SuS, auch für die schnellen. Kernaufgaben und Pufferaufgaben zusammen müssen das leisten.
- Kernaufgaben: durchschnittliche SuS sind damit realistisch ca. 30–35 Min. (Einzel) bzw. ca. 60–70 Min. (Doppel) beschäftigt. Schwächere schaffen den Kern mit Hilfen in der Stunde.
- Kern + Pufferaufgaben: auch schnelle SuS arbeiten damit durchgehend mindestens 40 bzw. 80 Min. Dafür reichen die Pufferaufgaben zeitlich für mindestens ca. 15 Min. (Einzel) bzw. ca. 25 Min. (Doppel), und eine davon ist offen (siehe unten), sodass niemand vor dem Stundenende ohne Aufgabe ist.
- Weil kaum Zeit für eine lehrergeführte Phase bleibt, gehören Einstieg und Sicherung als Aufgaben aufs Blatt: Aufgabe 1 ist ein kurzer Einstieg (Foto, Fall, Frage), die letzte Kernaufgabe sichert das Ergebnis (z. B. Merksatz formulieren, Selbsttest, Kernaussage ins Heft). Beide zählen zur Arbeitszeit. Bei Doppelstunden nach ca. 40–45 Min. einen Phasenwechsel einplanen (neue Sozialform oder neues Material).
- Für jede Aufgabe wird ein Zeitansatz für durchschnittliche SuS des Jahrgangs ermittelt (Lesen, Nachdenken, Schreiben einrechnen). Er dient nur der Prüfung und steht nicht auf dem Lösungsblatt (R8). Die Summe der Kernaufgaben muss im Zielbereich liegen; sonst Aufgaben ergänzen oder vertiefen, nicht nur Schreibraum vergrößern.
- Der Umfang richtet sich nach dem Zeitansatz, nicht nach einer festen Aufgabenzahl.

**Pufferaufgaben – Pflicht auf jedem Arbeitsblatt**
- Am Ende jedes Arbeitsblatts ein klar abgesetzter Bereich „Schon fertig?“ mit gestuften Zusatzaufgaben: Einzelstunde mindestens 2, Doppelstunde mindestens 3.
  - ★ Profi-Aufgabe: vertiefen oder anwenden (AFB II–III).
  - ★★ Experten-Aufgabe: Transfer, Beurteilung oder kreatives Produkt.
  - Buchauftrag ins Heft (mit kleinem Buch-Icon als Vektorgrafik, kein Emoji), ohne Platzbedarf auf dem Blatt: „Buch S. __, M__ – Aufgabe __ ins Heft.“ Nur Seiten, Materialnummern und Aufgabennummern, die genau so auf den Scans stehen. Fehlen Scans: eine Heftaufgabe ohne Buch (z. B. Mindmap, Brief, Comic, Lernplakat).
- Mindestens eine Pufferaufgabe ist zeitlich offen und kann nie ausgehen (z. B. „Schreibe 5 Quizfragen mit Lösung für deine Mitschüler“ oder ein Heftprodukt).
- Das Lösungsblatt (R8) enthält auch die Lösungen zu allen Pufferaufgaben.
- Die Lernseite endet ebenfalls mit „Schon fertig?“ (Bonusetappe oder Verweis auf die Pufferaufgaben des Blatts).

**Kompakter Kopf – Platz für Aufgaben**
- Kopfhöhe, Bildgröße und Seitenzahl: siehe R9 (Kopf höchstens 3 cm, Bilder max. ca. 4 cm hoch). Ablauf und „Du brauchst“ teilen sich eine Zeile.
- Der gewonnene Platz geht an Aufgaben und Pufferbereich. Weißraum ja, aber keine leeren Flächen ohne Funktion.
- Die Stundenfüllung (40 bzw. 80 Min.) entsteht aus Blatt + Buch + Heft zusammen, nicht aus der Länge des Blatts (R9).

**Prüfen vor dem Ausliefern**
- Zeitansätze addieren (mit Python), Knobelaufgabe und AFB-III-Aufgabe vorhanden, Pufferbereich vollständig, Kopfhöhe im gerenderten PNG gemessen.
- Abschlussnachricht: eine Zeile „Zeit/Puffer: Kern ca. X Min. · Puffer: ★ … · ★★ … · Buch S. … (bzw. Heftaufgabe)“, bei mehreren Einheiten je Einheit.

### R3 – Selbstlaufendes Arbeitsblatt: ohne Internet, ohne iPad, mit Vertretung (Stand 11.11.2026)

Gilt für jedes Arbeitsblatt aller Klassen. Ziel: Die Stunde läuft vollständig, auch wenn das Internet ausfällt, der iPad-Wagen fehlt, ein Link nicht geht oder eine Vertretungslehrkraft ohne Vorbereitung die Stunde übernimmt.

- **Alles Nötige auf dem Blatt oder im Buch:** Jede Kernaufgabe lässt sich allein mit Arbeitsblatt, Buch (genaue Seite und Materialnummer), Heft und ggf. Atlas lösen. Nichts, was für die Kernaufgaben nötig ist, steht nur auf der Lernseite. Kein Pflichtmaterial, das nur die Fachlehrkraft hat (Video, Folie, Tafelbild).
- **Selbsterklärende Aufgaben:** Operator fett, bei neuen Aufgabenformen ein kurzes Beispiel, Sozialform als Symbol. Keine Verweise wie „wie besprochen“, „siehe Tafel“ oder „deine Lehrkraft erklärt“.
- **Ablaufzeile unter dem Titel** (eine Zeile, zählt zum Kopfbereich): z. B. „So arbeitest du: 1 → 2 → 3 → 4 → Schon fertig?“ mit grober Minutenangabe. Die SuS wissen ohne Erklärung, was zu tun ist.
- **Kasten „Kein Internet / kein iPad?“** direkt unter oder neben dem QR-Code (1–2 Zeilen); wird der Kopf dadurch zu hoch, steht der Kasten mit dem QR-Code am Blattende (R1): „Kein Problem: Bearbeite alle Aufgaben auf diesem Blatt. Statt des Online-Quiz: …“ – mit einem konkreten Ersatz, entweder einem kurzen Selbsttest auf dem Blatt (4–6 Fragen zum Ankreuzen oder Kurzantworten) oder einem Buchauftrag mit Seite und Aufgabennummer. Gibt es kein Online-Angebot, entfällt der Kasten.
- **QR-Code ist immer Zusatz, nie Voraussetzung:** Keine Kernaufgabe und keine Pufferaufgabe setzt voraus, dass der QR-Code, die Lernseite oder das Internet funktioniert.
- **„Du brauchst“-Angabe** in der Ablaufzeile: z. B. „Du brauchst: Buch S. 202–205, Heft, Stift“.
- **Sozialform vertretungstauglich:** Ist eine Aufgabe als Partner- oder Gruppenarbeit gedacht, steht dabei, wie sie allein geht („Allein: …“), damit eine Vertretung die Klasse auch in Einzelarbeit lassen kann.
- **Lösungen zum Auslegen:** Das Lösungsblatt nach R8 kann ausgedruckt auf dem Kontrolltisch ausgelegt werden (Ablauf siehe R6). Hinweise für Lehrkraft oder Vertretung gibt es nicht; die gibt Tobias selbst.
- **Prüfen vor dem Ausliefern (Vertretungsprobe):** Lies nur das Schülerblatt mit den Augen einer fachfremden Vertretung und eines Schülers, der nicht im Unterricht war. Notiere jede Stelle, an der jemand fragen könnte „Was soll ich hier machen?“, „Wo steht das?“ oder „Ich bin fertig, was jetzt?“, und beseitige sie. Prüfe dann mit ausgeschaltetem Internet gedanklich: Kann die Klasse allein mit Blatt, Buch und Heft 45 bzw. 90 Minuten sinnvoll arbeiten, auch die Schnellen bis zum Schluss? Wenn nein: nachbessern.
- Abschlussnachricht: eine Zeile „Plan B: ja – Offline-Ersatz für das Quiz: …, Vertretungsprobe bestanden“.

### R4 – Natürliche Gestaltung: wie von einer erfahrenen Lehrkraft, nicht wie generiert (Stand 11.11.2026)

Anlass: SuS haben Tobias gefragt, ob die Blätter mit KI gemacht sind. Ziel ist nicht, etwas zu verschleiern, sondern Qualität: Ein Blatt soll aussehen und klingen wie von einer erfahrenen Lehrkraft oder einer Schulbuchredaktion, damit die SuS sich auf den Inhalt einlassen. Die Regel „keine KI-Hinweise auf dem Schülerblatt“ bleibt bestehen.

**Sprache**
- Sachlicher, klarer Schulbuchton, „du“-Ansprache, Arbeitsaufträge mit NRW-Operatoren. Überschriften schlicht wie im Schulbuch (Thema oder Leitfrage, höchstens ein kurzer Untertitel).
- Vermeiden (typische KI-Merkmale): Werbe- und Ausrufeüberschriften („Ab 14 wird's ernst!“, „Bist du bereit?“), Wörter wie „Mission“, „Challenge“, „Level“, „eintauchen“, „spannende Reise“, „entdecke“, „Detektiv“ als Dauerformel, rhetorische Fragenketten, „Stell dir vor …“ als Standardeinstieg, Lob-Floskeln („Super gemacht!“), Dreierreihen aus Gewohnheit, viele Gedankenstriche, Doppelpunkt-Überschriften in Serie, überall gleich lange Sätze. Höchstens eine bewusst motivierende Formulierung pro Blatt.
- Fallbeispiele wie aus dem echten Leben: alltägliche Vornamen, unperfekte Details, regionale Bezüge (Lippe, Bad Salzuflen) nur, wo sie sachlich stimmen. Keine erfundenen Fakten über reale Orte oder Personen.
- Materialien wie im Verlag: M1, M2 …; unter selbst geschriebenen Texten „Autorentext“; echte Quellen nur mit echter Angabe.

**Gestaltung**
- Konventionen echter Schularbeitsblätter: Kopfzeile mit Name/Klasse/Datum-Linien, Fach und Thema; Fußzeile mit Seitenzahl („S. 1/2“); Schreiblinien statt leerer Kästen; nummerierte Aufgaben; Materialkennzeichnung.
- Vermeiden (typische KI-Optik): Farbverläufe, Glanz-, Glow- oder Glaseffekte, Schlagschatten, überall abgerundete „Karten“ im App- oder Dashboard-Stil, Pillen-Badges, Neonfarben, Deko-Icons ohne Funktion, Icon an jeder Überschrift, perfekt symmetrische Kachelraster, für jeden Inhalt die gleiche Box, Emojis.
- Icons nur mit Funktion (Sozialform, Buch, Tipp, QR), schlicht, in einem Stil pro Blatt, sparsam.
- Kopiertauglich: Das Blatt funktioniert auch als Schwarz-Weiß-Kopie (Kontraste in Graustufen prüfen, keine großen Vollflächen, Text nie auf kräftigem Farbgrund).

**Bilder** (häufigster Grund für „Ist das KI?“)
- Echte Fotos haben Vorrang (Unsplash, Wikimedia Commons). KI-Bilder nie mit Menschen, Gesichtern, Händen, Tieren im Fokus oder Schrift im Bild; höchstens für neutrale Gegenstände oder Hintergründe und nur ohne erkennbare KI-Merkmale (Hochglanz-Look, unlogische Details, verzerrte Kanten). Sonst echtes Foto, schlichte Zeichnung oder Motiv weglassen.
- Jedes Bild in der Vorschau auf solche Merkmale prüfen.

**Bildnachweise dezent (Stand 11.11.2026)** – SuS haben die ständige Angabe „Unsplash“ unten auf den Blättern als KI-Hinweis gedeutet.
- **Unsplash (auch Unsplash+): kein Bildnachweis auf dem Schülerblatt und auf der Lernseite.** Die Unsplash-Lizenz verlangt keine Namensnennung, auch nicht bei Bildern, die über eine Unsplash-Integration geladen wurden. Fotograf und Link stehen nur in der Abschlussnachricht (nicht auf dem Lösungsblatt, R8); auf der Lernseite höchstens als HTML-Kommentar im Quelltext.
- **Wikimedia Commons gemeinfrei/CC0 und eigene Grafiken:** ebenfalls kein Nachweis auf dem Schülerblatt (nur in der Abschlussnachricht).
- **Wikimedia Commons mit CC BY oder CC BY-SA:** Nachweis ist Pflicht und bleibt. Dann im Verlagsstil: eine einzige kleine, graue Zeile (6–7 pt) ganz unten auf der Seite, beginnend mit „Bildnachweis:“, z. B. „Bildnachweis: M2 Max Muster / Wikimedia Commons, CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0)“. Auf der Lernseite dieselbe Angabe klein am Seitenende. Kein eigener Kasten, keine Überschrift, kein Logo.
- Deshalb bei gleich guter Eignung Bilder ohne Nachweispflicht bevorzugen (Unsplash, Commons gemeinfrei/CC0), damit das Schülerblatt ganz ohne Quellenzeile auskommt.
- Nie auf dem Schülerblatt oder der Lernseite: „Unsplash“, „Canva“, „Stock“, „KI“, „generiert“ oder Tool-Namen. Die Pflicht, nur rechtlich nutzbare Bilder zu verwenden und die Quelle zu kennen, bleibt unverändert.
- Einzige Ausnahme ist die gesetzlich nötige Kennzeichnung (Art. 50 Abs. 4 EU AI Act): Wirkt ein KI-Bild fotorealistisch und zeigt es real wirkende Orte, Ereignisse, Personen oder Gegenstände, die für echt gehalten werden könnten, steht in der kleinen Nachweiszeile „Abb. …: KI-generiert“. Solche Bilder deshalb möglichst vermeiden.

**Prüfen vor dem Ausliefern (KI-Probe):** Das gerenderte Blatt mit den Augen eines 13-Jährigen ansehen: Gibt es etwas, das „nach KI aussieht“ (Sprache, Optik, Bild)? Liste oben durchgehen und jeden Fund ändern. Abschlussnachricht: eine Zeile „KI-Probe: bestanden (geändert: …)“.

### R5 – Abwechslung in der Gestaltung (Stand 11.11.2026)

Jedes Arbeitsblatt sieht neu aus, als hätte es eine andere Person entworfen: zwischen den Klassen, an verschiedenen Tagen und auch innerhalb eines Laufs (GL 7 Einzel- und Doppelstunden-Blatt, GL 8 Bausteine einer Doppelstunde). R5 ersetzt die Erlaubnis „dürfen zusammengehörig aussehen“. Der didaktische Zweck geht immer vor: Lesbarkeit, klare Aufgabenstruktur und Kopiertauglichkeit (R4) dürfen nicht leiden.

**Merkmale, die variieren:**
1. Farbpalette (2–3 Farben; auch mal fast einfarbig mit einem Akzent)
2. Kopfgestaltung (Balken, Seitenleiste, Registerreiter, nur Linie, Titel links/mittig, mit oder ohne Bild)
3. Seitenraster (einspaltig, zweispaltig, schmale Randspalte für Hilfen, Material links/Aufgaben rechts)
4. Rahmen und Kästen (keine, feine Linie, Doppellinie, gestrichelt, nur Ecken, Karteikarte, Notizzettel, Hinterlegung)
5. Aufgabennummern (Kreis, Quadrat, Fahne, Zahl am Rand, fett mit Punkt)
6. Symbolstil (Linien-Icons, gefüllt, Piktogramm, Buchstaben-Symbole)
7. Schrift (Größen, Gewichte, Großbuchstaben-Titel oder nicht; nur lokal verfügbare, frei lizenzierte Schriften)
8. Hervorhebungen (Unterstreichung, Farbbalken am Rand, Kasten, Fettdruck)
9. Darstellung der Hilfen (Randspalte, Tippkarten unten, umgedrehter Kasten, Wortspeicher als Leiste)
10. Darstellung von Materialien (Zeitungsausschnitt, Infokarte, Tabelle, Steckbrief, Sprechblasen)
11. Pufferbereich „Schon fertig?“ (Kasten, Leiste, Abschnitt mit Trennlinie, Karte am Seitenende)

**Designprotokoll:** Führe in der Verlaufsdatei der Klasse den Abschnitt „Designprotokoll“ mit den letzten 8 Blättern (Datum · Blatt · Ausprägung der Merkmale 1–11 in Stichworten). Ein neues Blatt
- weicht vom zuletzt erstellten Blatt derselben Klasse in mindestens 6 der 11 Merkmale ab,
- wiederholt die Farbpalette keines der letzten 4 Blätter,
- wiederholt keine Kombination aus Kopfgestaltung + Seitenraster + Rahmen der letzten 8 Blätter.
Zwei Blätter desselben Laufs unterscheiden sich in mindestens 5 Merkmalen. Gleich bleiben dürfen nur Bedeutungen (z. B. ★ = Profi, ★★ = Experte, Symbol für Partnerarbeit), nicht ihre Gestaltung.

**Abwechslung auch in der Methode:** Im Designprotokoll zusätzlich je Blatt die Hauptmethode bzw. das prägende Aufgabenformat notieren (z. B. Fallanalyse, Quellenarbeit, Rangliste, Rollenkarte, Zeitleiste, Entscheidungsspiel, Bildanalyse, Streitgespräch, Lernplakat). Dieselbe Hauptmethode nicht zweimal hintereinander in derselben Klasse.

Abschlussnachricht: eine Zeile „Design: <Palette, Kopf, Raster in Stichworten> (neu gegenüber dem letzten Blatt: X von 11 Merkmalen)“.

### R6 – Ergebnissicherung, Selbstbewertung und Vorzeigen (Stand 11.11.2026)

Ziel: Jede Schülerin und jeder Schüler prüft und bewertet die eigene Leistung, die Lehrkraft sieht mit wenig Aufwand, was geleistet wurde, und eine Vertretung muss dafür nichts vorbereiten oder erklären. Der Ablauf steht vollständig auf dem Arbeitsblatt. Datenschutz bleibt unberührt: Es werden keine Ergebnisse gespeichert oder übertragen, alles bleibt auf Blatt und iPad.

**Feste Stufen (gleich in Quiz, Lernseite und Selbsttest, damit die SuS sie wiedererkennen)**
- Stufe A „Sicher“: ab 85 % · Stufe B „Gut, kleine Lücken“: 65–84 % · Stufe C „Teilweise – wiederholen“: 40–64 % · Stufe D „Noch unsicher – noch einmal üben“: unter 40 %.
- Jede Stufe ist durch Wort, Buchstabe und Form erkennbar (nicht nur durch Farbe; R4 Kopiertauglichkeit).
- Keine Schulnoten. Die Stufe ist eine Rückmeldung zum Lernstand, die Bewertung bleibt Sache der Lehrkraft.

**Quiz und Lernseite: automatische Auswertung**
- Ergebnisbildschirm am Ende, auf einen Blick lesbar: Titel der Stunde, Datum und Uhrzeit des Abschlusses, Punkte im ERSTEN Versuch (zählt), Prozent, Stufe groß.
- Rückmeldung je Etappe bzw. Teilthema: „Etappe 2 (…): 2 von 4 – wiederhole Etappe 2 oder Buch S. …, M…“ (nur Seiten, die genau so auf den Scans stehen). Bei Stufe A ein Hinweis auf die Pufferaufgaben des Blatts.
- Danach „Fehler verbessern“: nur die falsch beantworteten Fragen noch einmal. Der Bildschirm zeigt dann beides, „1. Versuch: X Punkte“ und „nach Verbesserung: Y Punkte“; die Stufe richtet sich nach dem 1. Versuch.
- Fortschritt per `localStorage` sichern (in `try/catch`), damit ein versehentliches Neuladen nichts löscht. „Neu starten“ nur über eine Rückfrage auf der Seite (kein Browser-Dialog).
- Unten auf dem Bildschirm die Anweisung: „Trag Punkte und Stufe auf deinem Arbeitsblatt bei ‚Mein Ergebnis‘ ein. Dann weiter wie auf dem Blatt beschrieben.“

**Arbeitsblatt: Feld „Mein Ergebnis“ (am Blattende, vor oder neben „Schon fertig?“)**
- Quiz bzw. Selbsttest: „___ von ___ Punkten · Stufe A B C D“ (ankreuzen). Ohne iPad zählt der Offline-Selbsttest aus R3; seine Lösungen stehen im Lösungsblatt (R8), die Stufen sind dieselben.
- Selbsteinschätzung: 2–4 Ich-kann-Sätze zum Inhalt der Stunde (z. B. „Ich kann erklären, ab wann Jugendliche strafmündig sind.“), je mit drei Kästchen „sicher · teilweise · noch nicht“, darunter eine Zeile „Das übe ich noch: …“ mit passendem Buch- oder Lernseitenverweis.
- Feld „Kontrolle: ______“ für das Kürzel der Lehrkraft.

**Ablauf für die SuS (steht auf dem Blatt, eine kurze nummerierte Anleitung beim Feld „Mein Ergebnis“)**
1. Kernaufgaben erledigt → am Kontrolltisch die eigenen Antworten mit dem ausgelegten Lösungsblatt vergleichen, mit anderer Stiftfarbe verbessern (Blatt mitnehmen, kein Heft, höchstens 3 SuS gleichzeitig am Tisch).
2. Quiz bzw. Selbsttest machen, „Mein Ergebnis“ ausfüllen.
3. Mit Blatt (und iPad mit Ergebnisbildschirm) nach vorne zur Lehrkraft. Stehen dort schon zwei: zurück an den Platz, an „Schon fertig?“ weiterarbeiten, später wiederkommen.
4. Danach „Schon fertig?“.
- Auf dem Blatt ist genau eine Kernaufgabe als **Kontrollaufgabe** markiert (eigenes, schlichtes Symbol plus Wort „Kontrolle“, möglichst die Sicherungs- oder AFB-III-Aufgabe). Nur sie wird vorgezeigt.
- Doppelstunde: nach Teil 1 nur Selbstkontrolle am Kontrolltisch, Vorzeigen erst am Ende (einmal pro Stunde, nicht pro Teil).

- Die Abschlussrunde ist Teil der Stunde: Kern + Puffer füllen die Arbeitszeit bis dahin (R2), die Runde liegt in den Minuten danach.

**Prüfen vor dem Ausliefern:** Stufen und Schwellen in Quiz, Lernseite und Selbsttest identisch und richtig berechnet (mit Testantworten durchklicken: 0 %, ca. 50 %, 100 %), Kontrollaufgabe markiert, Feld „Mein Ergebnis“ und Ablauf auf dem Blatt.
- Abschlussnachricht: eine Zeile „Ergebnissicherung: Stufen A–D im Quiz/Selbsttest, Kontrollaufgabe: Nr. …“.

### R7 – Qualitätsanspruch und Qualitätssicherung (Stand 11.11.2026)

**Maßstab:** Jedes Produkt (Arbeitsblatt, Lösungsblatt, Lernseite, Quiz) erreicht oder übertrifft die Qualität kommerzieller, käuflicher Unterrichtsmaterialien (Verlagsarbeitshefte, Bestseller auf Lehrer-Marktplätzen): fachlich fehlerfrei, didaktisch durchdacht, sauber gesetzt, sofort einsetzbar. Es läuft ohne Zutun der Lehrkraft (R3, R6); Tobias kann die Stunde trotzdem frei anders gestalten.

**Qualität vor Tempo:** Die Anweisung „Arbeite zügig und ohne unnötige Schleifen“ in den Aufträgen ist aufgehoben. Die Läufe starten seit 11.11.2026 kurz nach Mitternacht, es ist Zeit für mehrere Prüfrunden. Die Frist 6:00 Uhr bleibt. Wird es knapp (ab ca. 5:30 Uhr), die bis dahin beste, vollständig geprüfte Fassung ausliefern und offene Punkte in der Abschlussnachricht nennen.

**Arbeitsweise in Stufen (jede Stufe ist Pflicht):**
1. **Planen:** Stundenverlauf mit Minuten skizzieren, getrennt für schwache, mittlere und starke SuS (wer macht wann was, wo greifen Tipps, wo die Puffer). Erst dann bauen.
2. **Bauen** nach R1–R6 und R9–R14.
3. **Probebearbeitung:** Zu jeder Kernaufgabe drei Musterantworten schreiben: schwache Schülerin mit Tipps, mittlerer Schüler, starke Schülerin. Prüfen: Reichen die Tipps wirklich? Ist die Aufgabe ohne Rückfrage verständlich? Fordert sie die Starke? Passt der Schreibraum zur mittleren Antwort? Stimmen Zeitansätze und Lösungsblatt? Wenn nein: ändern.
4. **Technische Tests:**
   - PDF: jede Seite mit 200 dpi als PNG rendern und ansehen (abgeschnittene oder überlappende Texte, leere Seiten, Seitenumbrüche mitten in Aufgaben, Bildschärfe, Kopfhöhe, Graustufen-Probe nach R4), QR-Code nach R1 auslesen.
   - Lernseite und Quiz im Headless-Browser in iPad-Größe hoch und quer: jede Frage einmal richtig und einmal falsch beantworten, alle Knöpfe, Stufenberechnung mit 0 %, ca. 50 %, 100 %, „Fehler verbessern“, Neuladen mitten im Quiz (Fortschritt bleibt), Konsole fehlerfrei. Zusätzlich mit blockiertem Netzwerk laden: Die Seite muss vollständig funktionieren (keine externen Ressourcen).
5. **Unabhängige Prüfung:** Ein separater Prüf-Agent (Agent-Werkzeug, falls verfügbar), der an der Erstellung nicht beteiligt war, bekommt nur die gerenderten Seiten-PNGs von Arbeits- und Lösungsblatt, die Lernseiten-Datei und die Regeln R1–R14. Rolle: erfahrene Fachleitung GL/WiPo in NRW, zugleich fachfremde Vertretung und ein 13-jähriger Schüler. Auftrag: Mängel finden und nach Schwere ordnen (A = Stunde funktioniert so nicht oder fachlicher Fehler; B = deutlicher Qualitätsmangel; C = Kleinigkeit). Alle A- und B-Mängel beheben, danach eine zweite Prüfrunde; höchstens drei Runden. Ist kein Agent-Werkzeug verfügbar: eine zweite Prüfrunde selbst mit frischem Blick anhand derselben Liste durchführen und das in der Abschlussnachricht nennen.
6. **Endabnahme:** Erst ausliefern, wenn keine A-Mängel offen sind.

**Satz und Typografie (wie im Verlag):** einheitliche Abstände und Ränder (mind. 1,5 cm), Zeilenabstand gut lesbar, Fließtext mind. 10,5 pt (Jg. 7/8 möglichst 11 pt; Tipps mind. 9 pt; Seitenlimit R9), keine einzelnen Zeilen am Seitenanfang oder -ende, keine Aufgabe über einen Seitenumbruch zerrissen, Silbentrennung sauber, deutsche Anführungszeichen („…“), einheitliche Schreibweise, fehlerfreie Rechtschreibung und Zeichensetzung (jeden Text Korrektur lesen), Bilder für Druck scharf (ca. 300 dpi in Druckgröße), Bildnachweise klein und vollständig.

**Fachliche Richtigkeit:** Jede Sachaussage, Zahl, Altersgrenze, Jahreszahl und Seitenangabe gegen Buchscan oder seriöse Quelle prüfen (bei aktuellen Daten mit Stand). Lösungsblatt, Quiz und Arbeitsblatt widersprechen sich nirgends.

**Motivation:** Je Einheit mindestens ein Element mit Wahlfreiheit oder einem eigenen Produkt (Wahlaufgabe, kreative Gestaltung, Entscheidung mit Begründung) und ein echter Lebensweltbezug der Altersgruppe.


**Abschlussnachricht:** eine Zeile „Qualitätsprüfung: Probebearbeitung 3 Niveaus ✓ · Tests ✓ · unabhängige Prüfung: X Runden, behoben: … · offen: keine / …“.

### R8 – Lösungsblatt: nur Lösungen, zum Besprechen am Klassen-TV (Stand 11.11.2026)

Tobias zeigt das Lösungsblatt am iPad über den Klassen-TV und scrollt im Unterrichtsgespräch Aufgabe für Aufgabe weiter, damit die SuS mitschreiben und abhaken können. Hinweise zur Stunde, für die Lehrkraft oder für eine Vertretung braucht er nicht; den Ablauf gestaltet er selbst. R8 ersetzt alle anderen Vorgaben zum Inhalt des Lösungsblatts, auch in den Aufträgen der geplanten Aufgaben (z. B. Lehrkraftkasten, Vertretungskasten, Zeitplan mit/ohne iPads, Zeitansätze, Kernlehrplan- und Kompetenzbezug, Einsatzhinweise, „Andere Wege“, Lösungen zu Lernseite und Quiz, „UV … Stunde/Baustein X von Y“, Bildquellen, eigene Seite „Lösungen zur Selbstkontrolle“).

**Inhalt – nur Lösungen**
- Ausschließlich die Lösungen der Aufgaben des Arbeitsblatts, in derselben Reihenfolge, mit allen Details: Kernaufgaben, Pufferaufgaben (★, ★★, Buchauftrag, soweit lösbar), ggf. Offline-Selbsttest.
- So formuliert, wie die SuS es ins Heft oder aufs Blatt schreiben sollen (schülergerechte Sprache, vollständige Sätze, wo die Aufgabe Sätze verlangt). Bei offenen Aufgaben eine Musterlösung und darunter kurz „Auch richtig: …“. Keine Lehrersprache wie „Erwartungshorizont“ oder „Bewertung“.
- Nichts anderes: keine Hinweise zur Stunde, keine Lehrkraft- oder Vertretungshinweise, keine Zeitangaben, kein Lehrplanbezug, keine Lernseiten- oder Quizlösungen, keine Bildquellen, keine Planungsbegriffe, kein QR-Code.

**Form – für den Klassen-TV**
- PDF im A4-Querformat. Seite 1 beginnt oben mit „Lösungen“ und dem Titel des Arbeitsblatts (genau wie auf dem Blatt).
- Eine Aufgabe pro Seite, damit die SuS beim Scrollen die nächste Lösung noch nicht sehen. Teilaufgaben (a, b, c) stehen mit deutlichem Abstand untereinander auf derselben Seite. Reicht eine Seite nicht, geht die Aufgabe auf der nächsten Seite mit „(Fortsetzung)“ weiter.
- Jede Seite beginnt mit Aufgabennummer und Aufgabentitel genau wie auf dem Arbeitsblatt.
- Große, klare Schrift: Lösungstext mind. 20 pt, Überschriften größer; schwarz auf weiß, hoher Kontrast, schlicht, keine Deko, keine Farbflächen; aus der letzten Reihe lesbar. Fußzeile höchstens die Seitenzahl.
- Ausgedruckt dient dasselbe Blatt als Lösung zum Auslegen am Kontrolltisch (R6).

**Wohin mit dem Rest:** Zeitansätze werden weiter intern für R2 berechnet. Bildquellen und alles, was die Aufträge sonst fürs Lösungsblatt vorsehen, stehen nur noch in der Abschlussnachricht bzw. in der Verlaufsdatei, soweit die Aufträge das verlangen.

**Prüfen vor dem Ausliefern:** Jede Seite als PNG rendern und ansehen (eine Aufgabe pro Seite, nichts abgeschnitten, Schriftgröße), jede Lösung gegen Arbeitsblatt und Buch prüfen, keine Zusatzinformationen.
- Abschlussnachricht: eine Zeile „Lösungsblatt: nur Lösungen (R8), X Seiten“.

### R9 – Seitenlimit des Arbeitsblatts (Stand 12.11.2026)

Anlass: Am 12.11.2026 hatte das WiPo-10-Arbeitsblatt für eine Doppelstunde 6 Seiten. Tobias muss jedes Blatt für die ganze Klasse drucken; das ist zu teuer und zu aufwendig. R9 hat Vorrang vor allen Platz- und Umfangsangaben in R1–R8 und in den Aufträgen der geplanten Aufgaben (z. B. „viel Weißraum, großzügiger Schreibraum“ – ungültig).

**Höchstzahl Seiten (A4 hoch, Schüler-Arbeitsblatt; 2 Seiten = ein Blatt beidseitig)**
- Einzelstunde (45 Min.): höchstens 2 Seiten.
- Doppelstunde (90 Min.): Ziel 2 Seiten, höchstens 3 Seiten.
- GL 7 (Mittwoch): Einzelstunden-Blatt höchstens 2 Seiten, Doppelstunden-Blatt Ziel 2, höchstens 3 Seiten.
- GL 8 (Bausteine à 45 Min.): jeder Baustein höchstens 2 Seiten, Ziel 1–2. Zwei direkt aufeinanderfolgende Bausteine (Bxx und Bxx+1) zusammen höchstens 3 Seiten, also nie zwei 2-seitige Bausteine hintereinander. Vor dem Bau die Seitenzahl des vorigen Bausteins in der Bausteinliste nachsehen; die Seitenzahl jedes Bausteins dort eintragen.
- Das Lösungsblatt (Querformat für den Klassen-TV, R8) zählt nicht mit.

**Die Stunde bleibt trotzdem voll (R2) und läuft ohne iPad (R3) – mit Blatt + Buch + Heft**
- Was nicht aufs Blatt passt, wird ins Buch und ins Heft verlagert, nicht gestrichen: passende Aufgaben aus dem Schulbuch auswählen und als Buchauftrag aufs Blatt setzen, mit Buch-Icon und Heft-Hinweis, z. B. „Buch S. 186, M3 – Aufgabe 2 ins Heft“. Seiten, Materialnummern und Aufgabennummern nur so, wie sie auf den Scans stehen. Fehlen Scans: Heftaufgabe ohne Buch.
- Materialtexte, die im Buch stehen, nicht abdrucken, sondern per Buchauftrag lesen lassen. Auf dem Blatt stehen nur Materialien, die das Buch nicht hat (meist höchstens ein kurzer eigener Text oder ein Schaubild).
- Längere Antworten (mehr als ca. 4 Zeilen) gehören ins Heft: Heft-Symbol an der Aufgabe, auf dem Blatt keine Schreiblinien dafür. Schreiblinien nur für Kurzantworten, Tabellen und Lücken.
- Pufferaufgaben „Schon fertig?“ (★, ★★, offene Aufgabe) möglichst als Einzeiler mit Buch- oder Heftbezug, ohne Schreibraum auf dem Blatt.
- Der Offline-Ersatz für das Quiz (R3) ist bevorzugt ein Buchauftrag oder ein Selbsttest im Heft; ein Selbsttest auf dem Blatt höchstens 4 kurze Fragen, kompakt in einer Leiste.
- Die Lernseite darf mehr enthalten als das Blatt (zusätzliche Etappen, Animationen, Bonusfragen). Das Blatt bildet die Lernseite nicht vollständig ab; es trägt den QR-Code (R1) und alle Kernaufgaben, die mit Blatt, Buch und Heft lösbar sind.

**Platz sparen – Layout**
- Kopfbereich höchstens 3 cm (Titel, Fach, Name/Klasse/Datum, QR-Code, Ablauf- und „Du brauchst“-Zeile in einer Zeile).
- Bilder klein: höchstens 1 Bild pro Seite, max. ca. 4 cm hoch, gern schmal neben dem Text; nur Bilder mit Funktion (Material, Einstieg). Kein reines Deko-Bild.
- Zweispaltig, wo es passt (Material links, Aufgaben rechts; Randspalte für Tipps).
- Tipps kompakt: eine Tippleiste am Seitenende oder schmale Randspalte, Schrift mind. 9 pt.
- „Mein Ergebnis“ (R6) kompakt in höchstens ca. 4 cm Höhe, gern neben „Schon fertig?“.
- Lesbarkeit bleibt Pflicht: Fließtext und Aufgaben mind. 10,5 pt (Jg. 7/8 möglichst 11 pt), Ränder mind. 1,5 cm, keine gequetschten Zeilen. Lieber Inhalte ins Buch/Heft verlagern als die Schrift verkleinern.

**Reihenfolge, wenn das Blatt zu lang ist**
1. Lange Antworten ins Heft (Schreiblinien weg). 2. Bilder verkleinern oder weglassen. 3. Materialtexte durch Buchaufträge ersetzen. 4. Puffer und Selbsttest ins Buch/Heft verlagern. 5. Layout verdichten (zweispaltig, Kopf kleiner). 6. Erst dann Aufgaben zusammenlegen. Nie die Stundenfüllung (R2) oder Plan B (R3) aufgeben.

**Prüfen vor dem Ausliefern:** Seitenzahl jedes Arbeitsblatt-PDFs mit Python (pypdf) zählen. Liegt sie über dem Limit, wird nicht ausgeliefert: kürzen nach der Reihenfolge oben und neu prüfen. Bei der Vertretungsprobe (R3) mitprüfen, ob jede Buch- und Heftaufgabe ohne Rückfrage verständlich ist.
- Abschlussnachricht: eine Zeile „Umfang: Arbeitsblatt X Seiten (max. Y) · ins Buch/Heft verlagert: …“, bei mehreren Blättern je Blatt.

**Platz voll nutzen (Stand 12.11.2026):** Das Limit ist eine Obergrenze, kein Freibrief für halbleere Seiten. Jede Seite ist sinnvoll gefüllt; die letzte Seite mindestens zu etwa zwei Dritteln. Würde eine dritte Seite nur zu einem Drittel gefüllt, wird auf 2 Seiten verdichtet (Reihenfolge oben). Würde eine Seite deutlich leer bleiben, wird der Platz für Aufgaben, Hilfen oder Pufferaufgaben genutzt, nicht für größere Bilder oder Weißraum. Prüfen am gerenderten PNG der letzten Seite.

### R10 – Die Lernseite trägt die Stunde allein (Stand 12.11.2026)

Wunsch von Tobias: Über den QR-Code auf dem Arbeitsblatt kommen die SuS auf eine Lernseite, mit der sie auch OHNE Arbeitsblatt die ganze Stunde sinnvoll arbeiten können – 45 Minuten bei einer Einzelstunde, 90 Minuten bei einer Doppelstunde. Arbeitsblatt (R3, ohne iPad) und Lernseite (ohne Blatt) sind zwei vollwertige Wege durch dieselbe Stunde.

- **Vollständig:** Die Lernseite enthält alle Inhalte, Materialien und Aufgaben, die für die Lernziele der Stunde nötig sind, in digitaler Form – mindestens alles, was das Blatt verlangt, gern mehr (zusätzliche Etappen, Animationen, Bonusfragen). Nichts Pflichtiges steht nur auf dem Blatt.
- **Zeit:** Etappen und Aufgaben füllen für durchschnittliche SuS mindestens 40 bzw. 80 Minuten; Zeitansätze je Etappe wie in R2 ermitteln und addieren. Doppelstunde: zwei klar getrennte Teile mit Phasenwechsel (bei GL 8 zwei Baustein-Seiten mit Weiter-Knopf, zusammen 80 Minuten). Am Ende „Schon fertig?“ mit Bonusetappe, die nie ausgeht.
- **Schreibanteil:** Aufgaben, die eigene Sätze verlangen (AFB II/III), stehen auch auf der Lernseite, mit dem Hinweis „Schreibe deine Antwort ins Heft (Aufgabe …)“ und anschließender Musterlösung zum Aufklappen erst nach dem Schreiben. So bleibt der Kompetenzanspruch erhalten, auch wenn das Blatt fehlt.
- **Buch:** Buchaufträge mit Seite und Materialnummer wie auf dem Blatt (nur Angaben genau wie auf den Scans), Datenschutz und Urheberrecht nach Abschnitt „Datenschutz“ (keine Buchtexte, keine Scans).
- **Differenzierung:** Tipps gestuft zum Aufklappen, Profi- und Expertenetappen für Starke, kurze Etappen und Vorlesen/Worterklärungen für Schwächere (R2).
- **Ergebnissicherung:** Ergebnisbildschirm nach R6; Hinweis, was ins Heft gehört.
- **Prüfen:** Probebearbeitung der Lernseite ohne Blatt (R7 Stufe 3) – trägt sie 45 bzw. 90 Minuten? Technische Tests nach R7 Stufe 4.
- Abschlussnachricht: eine Zeile „Lernseite allein: ca. X Min. (Etappen: …), alle Pflichtaufgaben enthalten: ja“.

### R11 – Planung: Einbettung in die Reihe, Stundenbudget, Kompetenzen, Buch (Stand 12.11.2026)

Gilt für jeden Lauf zusätzlich zu den Jahresplan-Abschnitten der Aufträge.
- **Einbettung:** Jede Stunde knüpft erkennbar an die vorige an (kurzer Rückbezug in Aufgabe 1 oder auf der Lernseite) und bereitet die nächste vor. In der Verlaufsdatei steht je Stunde: UV, „Stunde X von Y“ (Budget laut Curriculum), Lernziel in einem Satz, Anschluss an die vorige Stunde, Vorgemerkt als Nächstes.
- **Stundenbudget:** Vor jeder Planung die bereits gehaltenen Stunden des laufenden UV zählen und mit dem Budget des schulinternen Curriculums vergleichen. Ein UV überschreitet sein Budget nicht; ist das Budget erreicht, wird gesichert und das nächste UV begonnen. Abweichungen (z. B. Ausfälle) mit Kürzungsvorschlag melden. Das Ergebnis steht in jeder Abschlussnachricht („UV … Stunde X/Y“).
- **Kompetenzorientierung:** Je Stunde 1–2 konkrete Kompetenzerwartungen aus dem schulinternen Curriculum bzw. Kernlehrplan GL/WiPo NRW (Sach-, Methoden-, Urteils-, Handlungskompetenz) auswählen, in der Verlaufsdatei notieren und die Aufgaben darauf ausrichten: Erarbeitung → Anwendung → Urteil/Transfer → Sicherung. Die Sicherungs- bzw. Kontrollaufgabe prüft genau diese Kompetenz. Auf dem Schülerblatt stehen keine Planungsbegriffe; dort zeigen höchstens die Ich-kann-Sätze (R6), worum es geht.
- **Buch:** Liegen Buchseiten zum Thema vor, enthält jede Stunde mindestens einen Buchauftrag (Material lesen oder Aufgabe ins Heft), mit Seite, Materialnummer und Aufgabennummer genau wie auf den Scans. Datenschutz und Urheberrecht nach Abschnitt „Datenschutz“.
- **Motivation:** Thema mit Bezug zur Lebenswelt der Altersgruppe; je Stunde eine Wahl- oder Produktaufgabe (R7).

### R12 – Zugriff auf Planungsdaten vor dem Start prüfen (Stand 12.11.2026)

Anlass: Am 12.11.2026 lief WiPo 10 ohne Zugriff auf Curriculum, Verlaufsdatei und Buchseiten; das Blatt entstand ohne Buchbezug und ohne Budgetprüfung.
- Zu Beginn jedes Laufs prüfen, ob Verlaufsdatei, schulinternes Curriculum und die Buchseiten des aktuellen UV lesbar sind. Das Werkzeug dafür heißt **„Projects“** und ist in den geplanten Läufen direkt eingebaut (Methoden `project_info` zum Auflisten der Projektdateien, `project_read`, `project_search`, `project_write`); es taucht in der ToolSearch-Suche NICHT auf. Zuerst `project_info` für das Projekt der Klasse aufrufen, dann die Dateien öffnen. Nur wenn kein solches Werkzeug in der eigenen Werkzeugliste steht: per ToolSearch suchen, nach ca. 30 Sekunden ein zweites Mal. (Gegenprobe 12.11.2026: Lauf sah mit `Projects · project_info` alle GL-10-Dateien.)
- Fehlt etwas davon: SOFORT eine eigene SendUserMessage an Tobias: „ACHTUNG <Klasse>: kein Zugriff auf <Verlaufsdatei / Curriculum / Buchseiten> – Fehlermeldung: …“. Danach trotzdem die bestmögliche Stunde erstellen (Fallback: Verlauf aus `planung/verlauf/<klasse>.md` im Repository, falls vorhanden; sonst aus den letzten Einträgen der lessons.json der Klasse und den neuesten Chats), keine Buchseiten erfinden. Ganz oben in der Abschlussnachricht: „ACHTUNG: erstellt ohne …“.
- Spiegel im Repository: Nach jedem Lauf mit Zugriff legt der Lauf eine kurze Planungsübersicht als `planung/verlauf/<klasse>.md` in die Übergabe (R14; `<klasse>` = gl7, gl8, gl10, wipo10). Inhalt: UV-Liste mit Budgets und gehaltenen Stunden, letzte 10 Stunden mit Thema und Lernziel, Vorgemerkt als Nächstes, Buchindex des aktuellen und nächsten UV: Seite · Materialnummer · Materialart · Aufgabennummern – nur Nummern und Stichworte, keine Buchtexte. Keine Schülerdaten, keine Namen, keine Noten.
- Abschlussnachricht: eine Zeile „Planungsdaten: Verlauf ✓/✗ · Curriculum ✓/✗ · Buchseiten ✓/✗“.

### R13 – Ablauf jedes geplanten Laufs (Stand 12.11.2026)

Gilt für die Erstell-Aufgaben GL 7, GL 8a, GL 8e, GL 10 und WiPo 10. Der Auftragstext nennt nur noch das Klassenspezifische (Stundenplan, Projekt, Dateien, Buch, Reihenfolge, Besonderheiten). Reihenfolge der Schritte:
1. **Start:** Datum mit `current_time`. Repository lesend klonen: `git clone https://github.com/Ideenclub/lernseiten.git` (öffentlich; kein add_repo, kein Push nötig). Diese CLAUDE.md lesen, dann `planung/termine-2026-27.json` (alle Ferien, Feiertage, beweglichen Ferientage und SuS-freien Tage sind frei; Einträge mit „jahrgaenge“ nur für diese Jahrgänge).
2. **Planungsdaten nach R12** (Werkzeug „Projects“: zuerst `project_info`). Neueste Chats des Projekts mit `recent_chats`/`conversation_search` prüfen, falls verfügbar; Tobias' Angaben (Ausfall, „nicht geschafft“, „zu schwer“) haben Vorrang.
3. **Abbruchfälle:** Morgen unterrichtsfrei oder kein Unterrichtstag der Klasse → nichts erstellen, nur kurz per SendUserMessage melden (mit Buchseiten-Erinnerung und Jahresplan-Zeile). Steht im Protokoll der Verlaufsdatei schon eine Stunde mit diesem Datum → nur melden. Ab 01.09.2027 nichts erstellen, nur um Bestätigung von Stundenplan und Lerngruppe bitten.
4. **Buchseiten-Check:** Liegen für das aktuelle UND das nächste UV Buchseiten im Projekt? Fehlen sie und beginnt das nächste UV innerhalb von zwei Unterrichtswochen: sofort eine eigene SendUserMessage „Erinnerung <Klasse>: Ab <Datum> beginnt UV … (Kap. …, S. …). Bitte lade die Buchseiten ins Projekt „…“ hoch.“ – in jedem Lauf, solange sie fehlen.
5. **Jahresplan und Budget nach R11:** verfügbare Stunden mit Python aus Stundenplan und Termine-Datei exakt zählen (nie schätzen), gehaltene Stunden je UV zählen, Budget nie überschreiten. Höchstens 4 Stunden Budget übrig → Hinweis „UV endet in X Stunden (am <Datum>) – nächstes UV „…“ ab <Datum>“; ist das Budget ausgeschöpft, wird die Stunde Abschluss und Sicherung des UV. Kein Budget im Curriculum → sinnvoll verteilen und „(Budget geschätzt, kein Wert im Curriculum)“. Keine erfundenen Zahlen.
6. **Planen** (R7 Stufe 1, R11), dann **bauen** nach R1–R10: Arbeitsblatt-PDF und Lösungsblatt-PDF (R8) mit Python/ReportLab, Lernseite (R10, Dateiform siehe Hinweis oben), QR-Code auf dem Blatt (R1) und großer QR-Code zum Zeigen (PNG, mind. 1200 px, darunter Thema, Klasse, Datum, Kurz-URL; mit Decoder geprüft). Lehrwerk immer C.C. Buchner (nie Westermann); Seiten, Materialnummern und Aufgabennummern nur genau wie auf den Scans.
7. **Prüfen** nach R7 (Probebearbeitung, technische Tests, unabhängige Prüfung, Endabnahme) und R9 (Seitenzahl mit pypdf).
8. **Ausliefern:** alle PDFs und QR-PNGs per SendUserFile (status: proactive; QR-PNG mit display: render). Kein E-Mail-Versand, kein Gmail-Werkzeug.
9. **Übergabe zum Hochladen nach R14** (Artefakt der Stunde mit Ordner `repo/`, dann Hochlade-Aufgabe anstoßen).
10. **Verlaufsdatei** im Projekt aktualisieren: `project_read` direkt vor dem Schreiben, dann `project_write` mit vollem Inhalt; alle bestehenden Abschnitte übernehmen, nie Platzhalter. Pflichtangaben nach R11 und R5 (Designprotokoll), Protokollzeile mit Datum · Einzel/Doppel · UV · Stunde X/Y · Thema · Lernziel · Kompetenzen · Buchseiten · Lernseiten-URL · Seitenzahl Arbeitsblatt · Artefakt-Link, „Jahresplan 2026/27“ neu berechnet, „Vorgemerkt als Nächstes“. Veraltete Niveauabschnitte dabei nach R2 ersetzen.
11. **Abschlussnachricht** (SendUserMessage, Deutsch): zuerst die Kopfzeilen aus dem Auftrag, dann in dieser Reihenfolge je eine Zeile: Lernseite (URL, „wird automatisch hochgeladen – Bestätigung folgt“) · Artefakt · Buchseiten · Planungsdaten (R12) · Jahresplan/UV Stunde X/Y (R11) · Umfang (R9) · QR auf dem Arbeitsblatt (R1) · Lernseite allein (R10) · Zeit/Puffer (R2) · Plan B (R3) · KI-Probe (R4) · Design (R5) · Ergebnissicherung (R6) · Qualitätsprüfung (R7) · Lösungsblatt (R8) · Übergabe (R14). Danach höchstens 2–3 Zeilen zu Unsicherheiten, Buchfehlern, Kürzungsvorschlägen oder fehlenden Unterlagen. Fehlt etwas nach R12: „ACHTUNG: erstellt ohne …“ ganz oben.

### R14 – Übergabe zum Hochladen (Stand 12.11.2026)

Hintergrund (Tests vom 12.11.2026): Die Erstell-Aufgaben haben das Werkzeug „Projects“ (Curriculum, Verlauf, Buchseiten), dürfen aber nicht ins Repository schreiben (Push 403). Die Aufgabe „Lernseiten hochladen“ darf pushen, sieht aber die Projekte nicht. Deshalb übergibt jeder Erstell-Lauf seine Repository-Dateien über das Artefakt der Stunde, und die Hochlade-Aufgabe veröffentlicht sie. Tobias muss nichts hochladen.

**Erstell-Lauf**
- Keinen Push versuchen, kein Upload-ZIP bauen.
- Genau ein Artefakt pro Lauf (das Artefakt der Stunde; Werkzeug per ToolSearch laden, z. B. `mcp__claude-artifacts__publish_files`, vorher dessen guide lesen). Titel wie im Auftrag (z. B. „GL 7 Jugendgericht“). Jede Veröffentlichung dieses Artefakts, auch jede spätere Korrektur, bekommt im Werkzeug `publish_files` den Parameter `label` = „Übergabe zum Hochladen“ (daran findet die Hochlade-Aufgabe es; getestet 12.11.2026). Inhalt:
  - `index.html`: schlichte, handytaugliche Seite für Tobias, ganz oben groß der QR-Code (mind. 300 px), dann Datum, Thema, Format, Buchseiten, Links zu PDFs, Lernseiten-URL.
  - PDFs und QR-PNGs der Stunde.
  - Ordner `repo/` mit jeder Datei, die ins Repository soll, unter ihrem Zielpfad, z. B. `repo/gl7/2026-11-18-jugendgericht.html`, `repo/gl8/b14-kinderarbeit.html`, `repo/planung/verlauf/gl7.md`. Immer der vollständige Endinhalt. Erlaubt sind nur .html- und .md-Dateien in gl7/, gl8/, gl10/, wipo10/ und planung/verlauf/; nie `index.html`, nie lessons.json, nie PDFs. Jede .html-Datei höchstens 3 MB (Bilder sonst stärker verkleinern).
  - `repo/uebergabe.json` (gültiges JSON, mit Python prüfen):
    `{"klasse": "GL7", "datum": "2026-11-18", "commit": "GL 7: Lernseiten Jugendgericht (18.11.2026)", "eintraege": [{"datei": "gl7/lessons.json", "eintrag": {"datum": "2026-11-18", "titel": "…", "typ": "Lernseite mit Quiz", "pfad": "2026-11-18-jugendgericht.html", "info": "Mi, Einzelstunde"}}], "urls": ["https://ideenclub.github.io/lernseiten/gl7/2026-11-18-jugendgericht.html"]}`
    Je neuem lessons.json-Eintrag ein Element in „eintraege“ (GL 8: gl8/lessons.json für neue Bausteine, gl8-1/lessons.json für 8a, gl8-2/lessons.json für 8e). Die Einträge werden oben eingefügt, bestehende Einträge bleiben unverändert.
- Danach die Hochlade-Aufgabe sofort anstoßen: per ToolSearch `select:mcp__claude-code-remote__fire_trigger` laden und `fire_trigger` mit `trigger_id` „trig_01VcXuL7Pk3V6YgARFKhtGX1“ und `text` „Übergabe <Artefakt-Slug>“ aufrufen. Ist das Werkzeug nicht da oder scheitert der Aufruf: nicht schlimm, die Hochlade-Aufgabe läuft zusätzlich So–Do um 2:43, 4:43 und 5:43 Uhr und holt alle offenen Übergaben selbst ab.
- Abschlusszeile: „Übergabe: Artefakt <URL> · Hochladen angestoßen ✓ / nicht möglich – wird spätestens 5:43 Uhr abgeholt“.

**Hochlade-Lauf („Lernseiten hochladen“)**
- Sucht mit `list_artifacts` (query „Übergabe zum Hochladen“, trifft das label) eigene Artefakte, die in den letzten 3 Tagen geändert wurden; erledigte Übergaben (Slug + Version) stehen in `planung/hochgeladen.json` und werden übersprungen. Ältere Übergaben vor neueren verarbeiten.
- Prüft jede Datei (erlaubter Pfad und Typ, keine externen Ressourcen wie `<script src="http…">` oder Fremd-Stylesheets, keine Schülernamen, JSON gültig), schreibt sie, fügt die lessons.json-Einträge oben ein (nur wenn derselbe „pfad“ mit demselben „datum“ noch fehlt), trägt die Übergabe in `planung/hochgeladen.json` ein, committet mit der Nachricht aus `uebergabe.json` und pusht direkt auf `main` (vorher fetch + rebase, höchstens drei Versuche).
- Meldet je Übergabe eine kurze SendUserMessage: „Hochgeladen ✓ <Klasse> <Datum>: <URL(s)> – online in 1–2 Minuten“ bzw. bei einem Fehler „ACHTUNG Hochladen <Klasse>: …“ mit dem Grund. Ohne offene Übergabe endet der Lauf ohne Nachricht.

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
- `gl8-1/` = Klassenseite der Klasse **8a** (GL am Montag Doppelstunde, Donnerstag Einzelstunde). Geplante Aufgabe „GL 8a“ (So + Mi 0:47), Projekt „GL 8a“ (Stammprojekt mit der gemeinsamen Verlaufsdatei).
- `gl8-2/` = Klassenseite der Klasse **8e** (GL am Mittwoch Einzelstunde, Donnerstag Doppelstunde). Geplante Aufgabe „GL 8e“ (Di + Mi 3:17), Projekt „GL 8e“. 8e setzt in der Regel Bausteine ein, die für 8a schon erstellt wurden; die Auslieferung erfolgt getrennt je Klasse (Stand 11.11.2026).
- In `gl8-1/lessons.json` und `gl8-2/lessons.json` steht pro Unterrichtstag der Klasse ein Eintrag mit dem Datum dieser Klasse; `pfad` zeigt auf den ersten Baustein der Stunde, z. B. `"../gl8/b12-dampfmaschine/"`, `info` z. B. `"Doppelstunde: Baustein 12 + 13"`.
- Folgen zwei Bausteine in einer Doppelstunde aufeinander, steht am Ende des ersten ein großer Weiter-Knopf zum nächsten. Entsteht ein Folgebaustein erst in einem späteren Lauf, wird der Weiter-Knopf im vorherigen Baustein dann ergänzt.

## Veröffentlichen

1. Nur im eigenen Klassenordner arbeiten. `index.html` im Hauptordner und die `index.html` der Klassenseiten nicht ändern.
2. `git add` nur die eigenen Dateien, Commit-Nachricht auf Deutsch, z. B. `GL 7: Lernseite Regenwald (11.11.2026)`.
3. Vor dem Push: `git fetch origin main && git rebase origin/main`. Direkt auf `main` pushen (so ist es ohne Zutun von Tobias online). Wird der Push abgelehnt: erneut fetch + rebase, höchstens dreimal.
4. URL der Seite: `https://ideenclub.github.io/lernseiten/<klasse>/<ordner>/`. GitHub Pages braucht nach dem Push etwa 1–2 Minuten.
5. QR-Code für diese URL mit Python (`pip install qrcode[pil] --break-system-packages`) erzeugen, Fehlerkorrektur M, mindestens 600 px, schwarz auf weiß.

### Wenn der Push scheitert: Upload-Paket für Tobias (ÜBERHOLT seit 12.11.2026 – es gilt R14; nur noch Notlösung, wenn auch die Hochlade-Aufgabe nicht pushen kann)

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
- Bilder nur mit klarer Lizenz (Unsplash, Wikimedia Commons mit passender Lizenz, eigene Grafiken). Bildnachweise nach R4 „Bildnachweise dezent“: Unsplash und gemeinfreie Bilder ohne sichtbaren Nachweis, CC-BY-Bilder mit einer kleinen Zeile am Seitenende.
- Keine Hinweise auf KI-Erstellung auf der Schülerseite (Ausnahme: rechtlich vorgeschriebene Kennzeichnung KI-generierter Bilder, dann knapp in der Bildnachweiszeile).

## Gestaltung einer Lernseite

- Eine einzige, in sich geschlossene `index.html`. Optimiert für iPad (Hoch- und Querformat), große Schaltflächen (mind. 44 px), gut lesbar auch am Beamer.
- Jede Seite bekommt eine eigene, stimmige Farbwelt und ein eigenes Layout (nicht schematisch wiederholen). Modern, ruhig, verlagsnah, keine Emojis als Gestaltungsmittel.
- Aufbau einer Lernseite für selbstständiges Arbeiten:
  - kurzer, motivierender Einstieg (Frage, Foto, Fall),
  - Lerninhalte in kleinen Etappen (kurze Texte, Fotos, Schaubilder, gern einfache Animationen in CSS/SVG/Canvas),
  - nach jeder Etappe 2–4 Quizfragen mit sofortiger Rückmeldung und kurzer Erklärung,
  - Buchaufträge mit genauer Seite und Materialnummer,
  - Fortschrittsanzeige, am Ende ein Abschluss-Quiz und ein Ergebnisbildschirm nach R6 (Stufe, Rückmeldung je Etappe, Hinweis aufs Blatt), ohne Namen,
  - Hinweis, was auf dem Arbeitsblatt bzw. im Heft gesichert wird.
- Fragetypen mischen: Multiple Choice, Richtig/Falsch, Zuordnen (Tippen statt Ziehen ist auf dem iPad zuverlässiger), Reihenfolge, Lückentext mit Auswahl, Bild anklicken.
- Niveau, Textlänge, Zeit und Pufferaufgaben: siehe R2 (Stand 11.11.2026). Ohne Internet und mit Vertretung muss das Arbeitsblatt die Stunde tragen: siehe R3.
- Nach dem Bauen: Seite lokal mit einem Headless-Browser (z. B. Playwright) in iPad-Größe (820×1180) als Screenshot prüfen, alle Quizfragen einmal durchklicken, JS-Konsole auf Fehler prüfen.
