---
applyTo: '**'
---

# Website Documentation

## Supported Languages
The website documentation is available in the following languages:
- English (en)
- Japanese (日本語) (ja)
- Chinese Simplified (简体中文) (zh-cn)
- Chinese Traditional (繁體中文) (zh-tw)
- Korean (한국어) (ko)
- German (Deutsch) (de)
- French (Français) (fr)
- Spanish (Español) (es)
- Portuguese Brazilian (Português do Brasil) (pt-br)

All translations should be accurate and maintain consistent terminology across languages. When adding new features or documentation, please ensure that the English version is updated first, followed by translations in other languages.

## Navigation Configuration
When modifying website navigation or adding new pages:
1. Update the configuration files in `website/client/.vitepress/config/`.

Ensure all language configurations are synchronized to maintain consistency across the documentation.

## Adding New Languages
When adding support for a new language, follow these steps:

1. Create a configuration file (e.g., `configXx.ts`) in `website/client/.vitepress/config/` based on existing language configurations
2. Include proper sidebar navigation, labels, and search translations
3. Update the imports and locale entries in the main VitePress configuration (`config.ts`)
4. Add search configurations to `configShard.ts`
5. Update the supported languages list in this file
6. Create directory structure for content (e.g., `website/client/src/xx/`)
7. Create content files starting with main index page and guide index
8. Progressively translate remaining documentation pages
9. Test navigation and search functionality in the new language

When working on multiple languages simultaneously, approach one language at a time completely before moving to the next language to maintain quality and consistency.
