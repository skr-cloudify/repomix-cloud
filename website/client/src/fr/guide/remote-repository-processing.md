# Traitement des dépôts distants

## Utilisation de base

Traiter des dépôts publics:
```bash
# En utilisant l'URL complète
repomix --remote https://github.com/user/repo
# En utilisant le format abrégé GitHub
repomix --remote user/repo
```

## Sélection de branche et de commit

```bash
# Branche spécifique
repomix --remote user/repo --remote-branch main
# Tag
repomix --remote user/repo --remote-branch v1.0.0
# Hash de commit
repomix --remote user/repo --remote-branch 935b695
```

## Prérequis

- Git doit être installé
- Connexion Internet
- Accès en lecture au dépôt

## Contrôle de la sortie

```bash
# Emplacement de sortie personnalisé
repomix --remote user/repo -o custom-output.xml
# Avec format XML
repomix --remote user/repo --style xml
# Supprimer les commentaires
repomix --remote user/repo --remove-comments
```

## Utilisation avec Docker

```bash
# Traiter et sortir dans le répertoire courant
docker run -v .:/app -it --rm ghcr.io/yamadashy/repomix \
  --remote user/repo
# Sortie vers un répertoire spécifique
docker run -v ./output:/app -it --rm ghcr.io/yamadashy/repomix \
  --remote user/repo
```

## Problèmes courants

### Problèmes d'accès
- Assurez-vous que le dépôt est public
- Vérifiez l'installation de Git
- Vérifiez la connexion Internet

### Dépôts volumineux
- Utilisez `--include` pour sélectionner des chemins spécifiques
- Activez `--remove-comments`
- Traitez les branches séparément
