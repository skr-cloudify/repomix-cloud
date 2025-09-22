# Configuration

## Démarrage rapide

Créer un fichier de configuration:
```bash
repomix --init
```

## Fichier de configuration

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "Texte d'en-tête personnalisé",
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

## Configuration globale

Créer une configuration globale:
```bash
repomix --init --global
```

Emplacement:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## Motifs d'exclusion

Priorité:
1. Options CLI (`--ignore`)
2. `.repomixignore`
3. `.gitignore` et `.git/info/exclude`
4. Motifs par défaut

Exemple de `.repomixignore`:
```text
# Répertoires de cache
.cache/
tmp/
# Sorties de build
dist/
build/
# Logs
*.log
```

## Motifs d'exclusion par défaut

Motifs communs inclus par défaut:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

Liste complète: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## Exemples

### Compression de code

Lorsque `output.compress` est défini sur `true`, Repomix extraira intelligemment les structures de code essentielles tout en supprimant les détails d'implémentation. Cela aide à réduire le nombre de tokens tout en conservant les informations structurelles importantes.

Pour plus de détails et d'exemples, consultez le [Guide de compression de code](code-compress).

### Intégration Git

La configuration `output.git` vous permet de contrôler comment les fichiers sont triés en fonction de l'historique Git et comment inclure les différences Git:
- `sortByChanges`: Lorsque défini sur `true`, les fichiers sont triés par nombre de changements Git (commits qui ont modifié le fichier). Les fichiers avec plus de changements apparaissent en bas de la sortie. Cela peut aider à prioriser les fichiers plus activement développés. Par défaut: `true`
- `sortByChangesMaxCommits`: Le nombre maximum de commits à analyser lors du comptage des modifications de fichiers. Par défaut: `100`
- `includeDiffs`: Lorsque défini sur `true`, inclut les différences Git dans la sortie (inclut séparément les modifications de l'arbre de travail et les modifications en cours). Cela permet au lecteur de voir les changements en attente dans le dépôt. Par défaut: `false`

Exemple de configuration:
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

### Suppression des commentaires

Lorsque `output.removeComments` est défini sur `true`, Repomix supprimera les commentaires des types de fichiers pris en charge pour réduire la taille de sortie et se concentrer sur le contenu essentiel du code.

Pour les langages pris en charge et des exemples détaillés, consultez le [Guide de suppression des commentaires](comment-removal).
