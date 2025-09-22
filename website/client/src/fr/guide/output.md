# Formats de sortie

Repomix prend en charge trois formats de sortie:
- XML (par défaut)
- Markdown
- Texte brut

## Format XML

```bash
repomix --style xml
```

Le format XML est optimisé pour le traitement par l'IA:

```xml
Ce fichier est une représentation fusionnée de toute la base de code...
<file_summary>
(Métadonnées et instructions pour l'IA)
</file_summary>
<directory_structure>
src/
  index.ts
  utils/
    helper.ts
</directory_structure>
<files>
<file path="src/index.ts">
// Contenu du fichier ici
</file>
</files>
```

::: tip Pourquoi XML?
Les balises XML aident les modèles d'IA comme Claude à analyser le contenu plus précisément. La [Documentation de Claude](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/use-xml-tags) recommande d'utiliser des balises XML pour les prompts structurés.
:::

## Format Markdown

```bash
repomix --style markdown
```

Le Markdown offre un formatage lisible:

```markdown
Ce fichier est une représentation fusionnée de toute la base de code...
# Résumé du fichier
(Métadonnées et instructions pour l'IA)
# Structure des répertoires
```
src/
index.ts
utils/
helper.ts
```
# Fichiers
## Fichier: src/index.ts
```typescript
// Contenu du fichier ici
```
```

## Utilisation avec les modèles d'IA

Chaque format fonctionne bien avec les modèles d'IA, mais considérez:
- Utilisez XML pour Claude (meilleure précision d'analyse)
- Utilisez Markdown pour une meilleure lisibilité générale
- Utilisez le texte brut pour la simplicité et une compatibilité universelle

## Personnalisation

Définissez le format par défaut dans `repomix.config.json`:

```json
{
  "output": {
    "style": "xml",
    "filePath": "output.xml"
  }
}
```

## Format texte brut

```bash
repomix --style plain
```

Structure de sortie:

```text
Ce fichier est une représentation fusionnée de toute la base de code...
================
Résumé du fichier
================
(Métadonnées et instructions pour l'IA)
================
Structure des répertoires
================
src/
  index.ts
  utils/
    helper.ts
================
Fichiers
================
================
Fichier: src/index.ts
================
// Contenu du fichier ici
```
