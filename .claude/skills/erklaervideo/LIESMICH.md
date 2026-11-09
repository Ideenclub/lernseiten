# Erklärvideos bestellen – Anleitung für Tobias

## So gibst du ein Video in Auftrag

1. Öffne Claude Code im Browser (claude.ai/code) am PC oder Handy.
2. Wähle das Repository **lernseiten** aus und starte eine neue Sitzung.
3. Schreib zum Beispiel:

   > Erstelle ein Erklärvideo für Klasse 7 (GL) zum Thema „Wie arbeiten Menschen im Regenwald?“ für die Stunde am 11.11.2026. Lernziel: Die Schüler können zwei Arbeitsformen im Regenwald beschreiben.

   Das Wort „Erklärvideo“ reicht, damit Claude den Skill benutzt. Sicher geht es mit `/erklaervideo` am Anfang der Nachricht.
4. Claude zeigt dir zuerst das **Drehbuch** (Sprechertext und was man sieht). Lies es durch und antworte mit „passt“ oder mit Änderungswünschen. Erst danach wird das Video erstellt.
5. Am Ende bekommst du: Link zur Seite, Link zur MP4-Datei, die zwei QR-Codes und eine kurze Rückmeldung.

Ein Video dauert insgesamt etwa 20–40 Minuten. Du kannst das Fenster in der Zeit schließen; die Sitzung läuft in der Cloud weiter.

## Falls du „mergen“ sollst

Manchmal landet das Ergebnis zuerst auf einem eigenen Arbeitszweig. Dann ist es noch nicht online. So übernimmst du es:

1. Schreib Claude in derselben Sitzung: **„Bitte einen Pull Request erstellen und direkt mergen.“** Claude erledigt beides.
2. Oder selbst auf github.com: Repository **ideenclub/lernseiten** öffnen → oben gelber Hinweis „… had recent pushes“ → **Compare & pull request** → **Create pull request** → **Merge pull request** → **Confirm merge**.
3. Nach 1–2 Minuten ist alles unter `https://ideenclub.github.io/lernseiten/videos/…` erreichbar.

## Video aufs iPad holen (für den Unterricht ohne Internet)

1. Den Direktlink zur MP4 in **Safari** öffnen.
2. Unten auf **Teilen** (Quadrat mit Pfeil) tippen → **In Dateien sichern** → Ordner wählen.
3. Im Unterricht: App **Dateien** öffnen, Video antippen, per AirPlay oder Kabel an den Beamer.

Alternativ auf der Videoseite auf **Video speichern** tippen.

## Was Geld kosten könnte (nur nach deiner Zustimmung)

- Standardmäßig kostet nichts: Stimme, Bilder (Unsplash, Wikimedia), Software und Veröffentlichung sind kostenlos.
- Eine noch natürlichere Profi-Stimme oder KI-generierte Fotos brauchen ein Konto bei einem Anbieter und ggf. Guthaben. Claude fragt dich vorher.

## Wenn etwas hakt

- **„Download gescheitert … Adresse freigeben“:** Die Cloud-Umgebung blockiert eine Internetadresse. Claude nennt dir die genaue Adresse. Meist schlägt Claude die Freigabe selbst vor, und du bestätigst sie nur auf einer Karte. Von Hand: In der Sitzung oben in der Titelzeile auf das Umgebungsmenü tippen → **Edit** → **Network access** → die Adresse unter **Allowed domains** eintragen (das Häkchen bei „Allow package managers“ gesetzt lassen) → speichern. Anleitung: https://code.claude.com/docs/en/cloud-environments#network-access
- **Video zu groß:** Wird automatisch auf unter 50 MB komprimiert.
- **Aussprache falsch:** Sag Claude das Wort und wie es klingen soll; der Satz wird neu vertont.
