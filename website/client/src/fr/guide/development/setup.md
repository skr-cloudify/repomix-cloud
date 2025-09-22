# Configuration de l'environnement de développement

## Prérequis

- Node.js ≥ 18.0.0
- Git
- npm

## Développement local

```bash
# Cloner le dépôt
git clone https://github.com/yamadashy/repomix.git
cd repomix
# Installer les dépendances
npm install
# Exécuter le CLI
npm run repomix
```

## Développement avec Docker

```bash
# Construire l'image
docker build -t repomix .
# Exécuter le conteneur
docker run -v ./:/app -it --rm repomix
```

## Structure du projet

```
src/
├── cli/          # Implémentation du CLI
├── config/       # Gestion de la configuration
├── core/         # Fonctionnalités principales
└── shared/       # Utilitaires partagés
```

## Tests

```bash
# Exécuter les tests
npm run test
# Couverture des tests
npm run test-coverage
# Linting
npm run lint-biome
npm run lint-ts
npm run lint-secretlint
```

## Processus de publication

1. Mettre à jour la version
```bash
npm version patch  # ou minor/major
```

2. Exécuter les tests et construire
```bash
npm run test-coverage
npm run build
```

3. Publier
```bash
npm publish
```
