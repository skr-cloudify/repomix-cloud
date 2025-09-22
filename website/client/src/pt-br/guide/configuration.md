# Configuração

## Início Rápido

Criar arquivo de configuração:
```bash
repomix --init
```

## Arquivo de Configuração

`repomix.config.json`:
```json
{
  "output": {
    "filePath": "repomix-output.xml",
    "style": "xml",
    "parsableStyle": true,
    "compress": false,
    "headerText": "Texto personalizado do cabeçalho",
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

## Configuração Global

Criar configuração global:
```bash
repomix --init --global
```

Localização:
- Windows: `%LOCALAPPDATA%\Repomix\repomix.config.json`
- macOS/Linux: `~/.config/repomix/repomix.config.json`

## Padrões de Ignorar

Prioridade:
1. Opções CLI (`--ignore`)
2. `.repomixignore`
3. `.gitignore` e `.git/info/exclude`
4. Padrões padrão

Exemplo de `.repomixignore`:
```text
# Diretórios de cache
.cache/
tmp/

# Saídas de build
dist/
build/

# Logs
*.log
```

## Padrões de Ignorar Padrão

Padrões comuns incluídos por padrão:
```text
node_modules/**
.git/**
coverage/**
dist/**
```

Lista completa: [defaultIgnore.ts](https://github.com/yamadashy/repomix/blob/main/src/config/defaultIgnore.ts)

## Exemplos

### Compressão de Código

Quando `output.compress` está configurado como `true`, o Repomix extrairá as estruturas essenciais do código enquanto remove os detalhes de implementação. Isso reduz a contagem de tokens enquanto mantém informações estruturais importantes.

Para mais detalhes e exemplos, consulte o [Guia de Compressão de Código](code-compress).

### Integração com Git

A configuração `output.git` permite controlar como os arquivos são ordenados com base no histórico do Git e como incluir diferenças do Git:

- `sortByChanges`: Quando configurado como `true`, os arquivos são ordenados pelo número de alterações no Git (commits que modificaram o arquivo). Arquivos com mais alterações aparecem no final da saída. Isso ajuda a priorizar arquivos mais ativamente desenvolvidos. Padrão: `true`
- `sortByChangesMaxCommits`: O número máximo de commits a analisar ao contar as alterações de arquivos. Padrão: `100`
- `includeDiffs`: Quando configurado como `true`, inclui diferenças do Git na saída (inclui separadamente tanto as alterações da árvore de trabalho quanto as alterações preparadas). Isso permite que o leitor veja as alterações pendentes no repositório. Padrão: `false`

Exemplo de configuração:
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

### Remoção de Comentários

Quando `output.removeComments` está configurado como `true`, os comentários são removidos dos tipos de arquivo suportados para reduzir o tamanho da saída e focar no conteúdo essencial do código.

Para linguagens suportadas e exemplos detalhados, consulte o [Guia de Remoção de Comentários](comment-removal).
