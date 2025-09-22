# Commencer avec Repomix

Repomix est un outil qui regroupe l'ensemble de votre dépôt de code en un seul fichier adapté à l'IA. Il est conçu pour vous aider à fournir votre base de code aux Grands Modèles de Langage (LLMs) comme ChatGPT, DeepSeek, Perplexity, Gemini, Gemma, Llama, Grok, et plus encore.

## Démarrage rapide

Exécutez cette commande dans le répertoire de votre projet:

```bash
npx repomix
```

C'est tout! Vous trouverez un fichier `repomix-output.xml` contenant l'intégralité de votre dépôt dans un format adapté à l'IA.

Vous pouvez ensuite envoyer ce fichier à un assistant IA avec une instruction comme:

```
Ce fichier contient tous les fichiers du dépôt combinés en un seul.
Je souhaite refactoriser le code, veuillez donc d'abord l'examiner.
```

L'IA analysera votre base de code complète et fournira des informations détaillées:

![Utilisation du fichier Repomix 1](/images/docs/repomix-file-usage-1.png)

Lors de la discussion de modifications spécifiques, l'IA peut vous aider à générer du code. Avec des fonctionnalités comme les Artefacts de Claude, vous pouvez même recevoir plusieurs fichiers interdépendants:

![Utilisation du fichier Repomix 2](/images/docs/repomix-file-usage-2.png)

Bon codage! 🚀

## Fonctionnalités principales

- **Sortie optimisée pour l'IA**: Formate votre base de code pour un traitement facile par l'IA
- **Comptage de tokens**: Suit l'utilisation des tokens pour les limites de contexte des LLM
- **Compatible avec Git**: Respecte vos fichiers `.gitignore` et `.git/info/exclude`
- **Axé sur la sécurité**: Détecte les informations sensibles
- **Plusieurs formats de sortie**: Choisissez entre texte brut, XML ou Markdown

## Prochaines étapes

- [Guide d'installation](installation.md): Différentes façons d'installer Repomix
- [Guide d'utilisation](usage.md): Découvrez les fonctionnalités de base et avancées
- [Configuration](configuration.md): Personnalisez Repomix selon vos besoins
- [Fonctionnalités de sécurité](security.md): Découvrez les vérifications de sécurité

## Communauté

Rejoignez notre [communauté Discord](https://discord.gg/wNYzTwZFku) pour:
- Obtenir de l'aide avec Repomix
- Partager vos expériences
- Suggérer de nouvelles fonctionnalités
- Vous connecter avec d'autres utilisateurs

## Support

Vous avez trouvé un bug ou besoin d'aide?
- [Ouvrez un ticket sur GitHub](https://github.com/yamadashy/repomix/issues)
- Rejoignez notre serveur Discord
- Consultez la [documentation](https://repomix.com)
