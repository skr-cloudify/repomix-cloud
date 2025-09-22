# Konfiguration

## Schnellstart

Konfigurationsdatei erstellen:
```bash
repomix --init
```

## Konfigurationsdatei

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "Benutzerdefinierter Kopftext",
    "instructionFilePath": "repomix-instruction.md",
    "fileSummary": true,
    "directoryStructure": true,
    "removeComments": false,
    "removeEmptyLines": false,
    "topFilesLength": 5,
    "showLineNumbers": false,
    "copyToClipboard": false,
    "includeEmptyDirectories": false,
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100
    }
  },
  "include": ["**/*"],
  "ignore": {
    "useGitignore": true,
    "useDefaultPatterns": true,
    "customPatterns": ["tmp/", "*.log"]
  },
  "security": {
    "enableSecurityCheck": true
  }
}
```

## Globale Konfiguration

Globale Konfiguration erstellen:
```bash
repomix --init --global
```

Speicherort:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## Ignore-Muster

Prioritätsreihenfolge:
1. CLI-Optionen (`--ignore`)
2. `.repomixignore`
3. `.gitignore` und `.git/info/exclude`
4. Standard-Muster

Beispiel für `.repomixignore`:
```text
# Cache-Verzeichnisse
.cache/
tmp/

# Build-Ausgaben
dist/
build/

# Logs
*.log
```

## Standard-Ignore-Muster

Standardmäßig enthaltene häufige Muster:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

Vollständige Liste: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## Beispiele

### Code-Komprimierung

Wenn `output.compress` auf `true` gesetzt ist, extrahiert Repomix wesentliche Code-Strukturen und entfernt dabei Implementierungsdetails. Dies reduziert die Token-Anzahl und behält gleichzeitig wichtige strukturelle Informationen bei.

Weitere Details und Beispiele finden Sie im [Code-Komprimierungs-Leitfaden](code-compress).

### Git-Integration

Die `output.git`-Konfiguration ermöglicht es Ihnen, die Sortierung von Dateien basierend auf der Git-Historie zu steuern und Git-Unterschiede einzubeziehen:

- `sortByChanges`: Wenn auf `true` gesetzt, werden Dateien nach der Anzahl der Git-Änderungen (Commits, die die Datei geändert haben) sortiert. Dateien mit mehr Änderungen erscheinen am Ende der Ausgabe. Dies hilft dabei, aktiver entwickelte Dateien zu priorisieren. Standard: `true`
- `sortByChangesMaxCommits`: Die maximale Anzahl von Commits, die bei der Zählung der Dateiänderungen analysiert werden. Standard: `100`
- `includeDiffs`: Wenn auf `true` gesetzt, werden Git-Unterschiede in die Ausgabe einbezogen (enthält sowohl Arbeitsbaumänderungen als auch Staging-Änderungen separat). Dies ermöglicht es dem Leser, ausstehende Änderungen im Repository zu sehen. Standard: `false`

Beispielkonfiguration:
```json
{
  "output": {
    "git": {
      "sortByChanges": true,
      "sortByChangesMaxCommits": 100,
      "includeDiffs": true
    }
  }
}
```

### Kommentarentfernung

Wenn `output.removeComments` auf `true` gesetzt ist, werden Kommentare aus unterstützten Dateitypen entfernt, um die Ausgabegröße zu reduzieren und sich auf den wesentlichen Code-Inhalt zu konzentrieren.

Unterstützte Sprachen und detaillierte Beispiele finden Sie im [Kommentarentfernungs-Leitfaden](comment-removal).
