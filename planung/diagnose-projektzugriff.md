# Diagnose Projektzugriff (12.11.2026)

Einmaliger Technik-Test aus einer geplanten Aufgabe (Cloud-Lauf, ca. 06:36 UTC). Nur Werkzeugnamen, ja/nein und Fehlermeldungen, keine Inhalte.

## 1. Suche nach Werkzeugen für Claude-Projekte und frühere Chats

Suchbegriffe per ToolSearch, zwei Durchgänge (zweiter nach 30 Sekunden Wartezeit):

| Suchbegriff | 1. Durchgang | 2. Durchgang |
|---|---|---|
| project_read | „No matching deferred tools found“ | „No matching deferred tools found“ |
| project_info | „No matching deferred tools found“ | „No matching deferred tools found“ |
| project_search | „No matching deferred tools found“ | „No matching deferred tools found“ |
| project | nur fremde Treffer (siehe unten) | nur fremde Treffer |
| recent_chats | „No matching deferred tools found“ | „No matching deferred tools found“ |
| conversation_search | „No matching deferred tools found“ | „No matching deferred tools found“ |

Treffer zu „project“, die NICHTS mit Claude-Projekten zu tun haben:
- `mcp__HyperFrames_by_HeyGen__list_projects`, `get_project`, `get_project_status`, `render_project_with_variables`, `compose` (HeyGen-Videoprojekte)
- `DesignSync` (claude.ai/design Design-System-Projekte)
- `mcp__Claude_Docs__read` (Claude-Docs-Dokumente)
- `mcp__Canva__create-design`, `mcp__Canva__create-folder`, `EnterWorktree`, `SearchMcpRegistry`, `TaskList`

Zusätzlich geprüft: `ListMcpResourcesTool` – nur Ressourcen des Figma-Servers, keine Projekt- oder Chat-Ressourcen.

**Ergebnis: Kein Werkzeug für Claude-Projekte, Projektdateien oder frühere Chats verfügbar** (weder `project_read`/`project_info`/`project_search` noch `recent_chats`/`conversation_search`).

Verbundene MCP-Server in diesem Lauf: Canva, Figma, Gamma, Gmail, Google_Calendar, Higgsfield_AI, HyperFrames_by_HeyGen, Unsplash, claude-code-remote, github, Claude_Docs, memory.

## 2. Projektdateien „WiPo 10“, „GL 7“, „GL 8a“, „GL 10“

| Projekt | Auflisten gelungen | Fehlermeldung | Sichtbare Dateinamen |
|---|---|---|---|
| WiPo 10 | nein | kein Projekt-Werkzeug vorhanden (ToolSearch: „No matching deferred tools found“) | keine |
| GL 7 | nein | dto. | keine |
| GL 8a | nein | dto. | keine |
| GL 10 | nein | dto. | keine |

## 3. Repository-Zugriff

- ToolSearch `select:mcp__claude-code-remote__add_repo,mcp__claude-code-remote__register_repo_root`: „No matching deferred tools found“ (beide Werkzeuge in diesem Lauf nicht vorhanden; vom Server claude-code-remote nur `create_trigger`, `delete_trigger`, `fire_trigger`, `list_triggers`, `send_later`, `update_trigger`).
- Repository `Ideenclub/lernseiten` war bereits geklont (`/home/claude/lernseiten`, Remote `https://github.com/Ideenclub/lernseiten`); `git fetch origin main` funktionierte.
- Push-Ergebnis: siehe Commit-Historie (gelingt der Push, liegt diese Datei auf `main`).

## Folgerung

Geplante Aufgaben in der Cloud haben derzeit keinen Zugriff auf Claude-Projektdateien (Verlaufsdatei, Curriculum, Buchseiten). Fallback nach R12: `planung/verlauf/<klasse>.md` im Repository.
