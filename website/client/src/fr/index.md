---
layout: home
title: Repomix
titleTemplate: Empaquetez votre code dans des formats adaptés à l'IA
aside: false
editLink: false

features:
  - icon: 🤖
    title: Optimisé pour l'IA
    details: Formate votre base de code d'une manière facilement compréhensible et traitable par l'IA.
  - icon: ⚙️
    title: Compatible avec Git
    details: Respecte automatiquement vos fichiers .gitignore.
  - icon: 🛡️
    title: Axé sur la sécurité
    details: Intègre Secretlint pour des vérifications de sécurité robustes afin de détecter et prévenir l'inclusion d'informations sensibles.
  - icon: 📊
    title: Comptage de tokens
    details: Fournit le nombre de tokens pour chaque fichier et l'ensemble du dépôt, utile pour les limites de contexte des LLM.

---

<div class="cli-section">

## Démarrage rapide

Une fois que vous avez généré un fichier compressé (`repomix-output.xml`) avec Repomix, vous pouvez l'envoyer à un assistant IA (comme ChatGPT, Claude) avec une instruction comme :

```
Ce fichier contient tous les fichiers du dépôt combinés en un seul.
Je souhaite refactoriser le code, veuillez donc d'abord l'examiner.
```

L'IA analysera votre base de code complète et fournira des informations détaillées :

![Utilisation de Repomix 1](/images/docs/repomix-file-usage-1.png)

Lors de la discussion de modifications spécifiques, l'IA peut vous aider à générer du code. Avec des fonctionnalités comme les Artefacts de Claude, vous pouvez même recevoir plusieurs fichiers interdépendants :

![Utilisation de Repomix 2](/images/docs/repomix-file-usage-2.png)

Bon codage ! 🚀

## Utilisation de l'outil CLI {#using-the-cli-tool}

Repomix peut être utilisé comme un outil en ligne de commande, offrant des fonctionnalités puissantes et des options de personnalisation.

**L'outil CLI peut accéder aux dépôts privés** car il utilise votre Git installé localement.

### Démarrage rapide

Vous pouvez essayer Repomix instantanément dans votre répertoire de projet sans installation :

```bash
npx repomix
```

Ou l'installer globalement pour une utilisation répétée :

```bash
# Installation avec npm
npm install -g repomix

# Alternativement avec yarn
yarn global add repomix

# Alternativement avec Homebrew (macOS/Linux)
brew install repomix

# Puis exécuter dans n'importe quel répertoire de projet
repomix
```

C'est tout ! Repomix générera un fichier `repomix-output.xml` dans votre répertoire actuel, contenant l'intégralité de votre dépôt dans un format adapté à l'IA.

### Utilisation

Pour empaqueter tout votre dépôt :

```bash
repomix
```

Pour empaqueter un répertoire spécifique :

```bash
repomix path/to/directory
```

Pour empaqueter des fichiers ou répertoires spécifiques en utilisant des [motifs glob](https://github.com/mrmlnc/fast-glob?tab=readme-ov-file#pattern-syntax) :

```bash
repomix --include "src/**/*.ts,**/*.md"
```

Pour exclure des fichiers ou répertoires spécifiques :

```bash
repomix --ignore "**/*.log,tmp/"
```

Pour empaqueter un dépôt distant :
```bash
# Utilisation du format abrégé
npx repomix --remote yamadashy/repomix

# Utilisation de l'URL complète (prend en charge les branches et les chemins spécifiques)
npx repomix --remote https://github.com/yamadashy/repomix
npx repomix --remote https://github.com/yamadashy/repomix/tree/main

# Utilisation de l'URL d'un commit
npx repomix --remote https://github.com/yamadashy/repomix/commit/836abcd7335137228ad77feb28655d85712680f1
```

Pour initialiser un nouveau fichier de configuration (`repomix.config.json`) :

```bash
repomix --init
```

Une fois que vous avez généré le fichier compressé, vous pouvez l'utiliser avec des outils d'IA générative comme Claude, ChatGPT et Gemini.

#### Utilisation avec Docker

Vous pouvez également exécuter Repomix avec Docker 🐳  
C'est utile si vous souhaitez exécuter Repomix dans un environnement isolé ou préférez utiliser des conteneurs.

Utilisation de base (répertoire courant) :

```bash
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix
```

Pour empaqueter un répertoire spécifique :
```bash
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix path/to/directory
```

Traiter un dépôt distant et sortir vers un répertoire `output` :

```bash
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix --remote https://github.com/yamadashy/repomix
```

### Formats de sortie

Choisissez votre format de sortie préféré :

```bash
# Format XML (par défaut)
repomix --style xml

# Format Markdown
repomix --style markdown

# Format texte brut
repomix --style plain
```

### Personnalisation

Créez un `repomix.config.json` pour des paramètres persistants :

```json
{
  "output": {
    "style": "markdown",
    "filePath": "custom-output.md",
    "removeComments": true,
    "showLineNumbers": true,
    "topFilesLength": 10
  },
  "ignore": {
    "customPatterns": ["*.test.ts", "docs/**"]
  }
}
```

### Plus d'exemples
::: tip Besoin de plus d'aide ? 💡
Consultez notre [guide](./guide/) pour des instructions détaillées, ou visitez notre [dépôt GitHub](https://github.com/yamadashy/repomix) pour plus d'exemples et le code source.
:::

</div>
