# Usar Repomix como Biblioteca

Además de usar Repomix como herramienta CLI, puedes integrar su funcionalidad directamente en tus aplicaciones Node.js.

## Instalación

Instala Repomix como dependencia en tu proyecto:

```bash
npm install repomix
```

## Uso Básico

La forma más sencilla de usar Repomix es a través de la función `runCli`, que proporciona la misma funcionalidad que la interfaz de línea de comandos:

```javascript
import { runCli, type CliOptions } from 'repomix';

// Procesar el directorio actual con opciones personalizadas
async function packProject() {
  const options = {
    output: 'output.xml',
    style: 'xml',
    compress: true,
    quiet: true
  } as CliOptions;
  
  const result = await runCli(['.'], process.cwd(), options);
  return result.packResult;
}
```

El `result.packResult` contiene información sobre los archivos procesados, incluyendo:
- `totalFiles`: Número de archivos procesados
- `totalCharacters`: Recuento total de caracteres
- `totalTokens`: Recuento total de tokens (útil para límites de contexto de LLM)
- `fileCharCounts`: Recuento de caracteres por archivo
- `fileTokenCounts`: Recuento de tokens por archivo

## Procesamiento de Repositorios Remotos

Puedes clonar y procesar un repositorio remoto:

```javascript
import { runCli, type CliOptions } from 'repomix';

// Clonar y procesar un repositorio de GitHub
async function processRemoteRepo(repoUrl) {
  const options = {
    remote: repoUrl,
    output: 'output.xml',
    compress: true
  } as CliOptions;
  
  return await runCli(['.'], process.cwd(), options);
}
```

## Uso de Componentes Principales

Para un mayor control, puedes usar las APIs de bajo nivel de Repomix directamente:

```javascript
import { searchFiles, collectFiles, processFiles, TokenCounter } from 'repomix';

async function analyzeFiles(directory) {
  // Encontrar y recopilar archivos
  const { filePaths } = await searchFiles(directory, { /* configuración */ });
  const rawFiles = await collectFiles(filePaths, directory);
  const processedFiles = await processFiles(rawFiles, { /* configuración */ });
  
  // Contar tokens
  const tokenCounter = new TokenCounter('o200k_base');
  
  // Devolver resultados del análisis
  return processedFiles.map(file => ({
    path: file.path,
    tokens: tokenCounter.countTokens(file.content)
  }));
}
```

## Ejemplo del Mundo Real

El sitio web de Repomix ([repomix.com](https://repomix.com)) utiliza Repomix como biblioteca para procesar repositorios remotos. Puedes ver la implementación en [website/server/src/remoteRepo.ts](https://github.com/yamadashy/repomix/blob/main/website/server/src/remoteRepo.ts). 
