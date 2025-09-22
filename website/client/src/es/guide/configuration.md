# Configuración

## Inicio Rápido

Crear archivo de configuración:
```bash
repomix --init
```

## Archivo de Configuración

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "Texto de encabezado personalizado",
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

## Configuración Global

Crear configuración global:
```bash
repomix --init --global
```

Ubicación:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## Patrones de Ignorar

Prioridad:
1. Opciones CLI (`--ignore`)
2. `.repomixignore`
3. `.gitignore` y `.git/info/exclude`
4. Patrones predeterminados

Ejemplo de `.repomixignore`:
```text
# Directorios de caché
.cache/
tmp/

# Salidas de construcción
dist/
build/

# Registros
*.log
```

## Patrones de Ignorar Predeterminados

Patrones comunes incluidos por defecto:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

Lista completa: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## Ejemplos

### Compresión de Código

Cuando `output.compress` está configurado como `true`, Repomix extraerá las estructuras esenciales del código mientras elimina los detalles de implementación. Esto reduce el conteo de tokens mientras mantiene información estructural importante.

Para más detalles y ejemplos, consulte la [Guía de Compresión de Código](code-compress).

### Integración con Git

La configuración `output.git` le permite controlar cómo se ordenan los archivos según el historial de Git y cómo incluir diferencias de Git:

- `sortByChanges`: Cuando está configurado como `true`, los archivos se ordenan por el número de cambios en Git (commits que modificaron el archivo). Los archivos con más cambios aparecen al final de la salida. Esto ayuda a priorizar los archivos más activamente desarrollados. Por defecto: `true`
- `sortByChangesMaxCommits`: El número máximo de commits a analizar al contar los cambios de archivos. Por defecto: `100`
- `includeDiffs`: Cuando está configurado como `true`, incluye diferencias de Git en la salida (incluye por separado tanto los cambios del árbol de trabajo como los cambios preparados). Esto permite al lector ver los cambios pendientes en el repositorio. Por defecto: `false`

Ejemplo de configuración:
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

### Eliminación de Comentarios

Cuando `output.removeComments` está configurado como `true`, se eliminan los comentarios de los tipos de archivo soportados para reducir el tamaño de la salida y enfocarse en el contenido esencial del código.

Para ver los lenguajes soportados y ejemplos detallados, consulte la [Guía de Eliminación de Comentarios](comment-removal).
