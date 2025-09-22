import { type DefaultTheme, defineConfig } from 'vitepress';

export const configFr = defineConfig({
  lang: 'fr-FR',
  description: "Empaquetez votre code dans des formats adaptés à l'IA",
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/fr/guide/' },
      { text: 'Rejoindre Discord', link: 'https://discord.gg/wNYzTwZFku' },
    ],
    sidebar: {
      '/fr/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Pour commencer', link: '/fr/guide/' },
            { text: 'Installation', link: '/fr/guide/installation' },
            { text: 'Utilisation de base', link: '/fr/guide/usage' },
            { text: 'Exemples de prompts', link: '/fr/guide/prompt-examples' },
            { text: 'Formats de sortie', link: '/fr/guide/output' },
            { text: 'Options de ligne de commande', link: '/fr/guide/command-line-options' },
            { text: 'Traitement des dépôts distants', link: '/fr/guide/remote-repository-processing' },
            { text: 'Configuration', link: '/fr/guide/configuration' },
            { text: 'Instructions personnalisées', link: '/fr/guide/custom-instructions' },
            { text: 'Suppression des commentaires', link: '/fr/guide/comment-removal' },
            { text: 'Compression de code', link: '/fr/guide/code-compress' },
            { text: 'Sécurité', link: '/fr/guide/security' },
            { text: 'Serveur MCP', link: '/fr/guide/mcp-server' },
            { text: 'GitHub Actions', link: '/fr/guide/github-actions' },
            {
              text: 'Astuces et conseils',
              items: [{ text: 'Meilleures pratiques', link: '/fr/guide/tips/best-practices' }],
            },
            {
              text: 'Développement',
              items: [
                { text: 'Contribuer', link: '/fr/guide/development/' },
                { text: 'Configuration', link: '/fr/guide/development/setup' },
                {
                  text: 'Utiliser Repomix comme bibliothèque',
                  link: '/fr/guide/development/using-repomix-as-a-library',
                },
              ],
            },
          ],
        },
      ],
    },
  },
});

export const configFrSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  fr: {
    translations: {
      button: {
        buttonText: 'Rechercher',
        buttonAriaLabel: 'Rechercher',
      },
      modal: {
        noResultsText: 'Aucun résultat trouvé',
        resetButtonTitle: 'Réinitialiser la recherche',
        backButtonTitle: 'Retour',
        displayDetails: 'Afficher les détails',
        footer: {
          selectText: 'Sélectionner',
          navigateText: 'Naviguer',
          closeText: 'Fermer',
        },
      },
    },
  },
};
