# Installation

## Utilisation avec npx (Sans installation requise)

```bash
npx repomix
```

## Installation globale

### npm

```bash
npm install -g repomix
```

### Yarn

```bash
yarn global add repomix
```

### Homebrew (macOS/Linux)

```bash
brew install repomix
```

## Installation avec Docker

Téléchargez et exécutez l'image Docker:

```bash
# Répertoire courant
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix
# Répertoire spécifique
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix path/to/directory
# Dépôt distant
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix --remote yamadashy/repomix
```

## Extension VSCode

Exécutez Repomix directement dans VSCode avec l'extension communautaire [Repomix Runner](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner).

Fonctionnalités:
- Empaquetez n'importe quel dossier en quelques clics
- Choisissez entre le mode fichier ou contenu pour la copie
- Nettoyage automatique des fichiers de sortie
- Compatible avec repomix.config.json

Installez-la depuis le [Marketplace VSCode](https://marketplace.visualstudio.com/items?itemName=DorianMassoulier.repomix-runner).

## Configuration requise

- Node.js: ≥ 18.0.0
- Git: Requis pour le traitement des dépôts distants

## Vérification

Après l'installation, vérifiez que Repomix fonctionne:

```bash
repomix --version
repomix --help
```
