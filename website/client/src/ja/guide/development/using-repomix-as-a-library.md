# ライブラリとしての使用

RepomixはCLIツールとしてだけでなく、Node.jsアプリケーションに直接組み込んで機能を利用することもできます。

## インストール

プロジェクトの依存関係としてRepomixをインストールします：

```bash
npm install repomix
```

## 基本的な使い方

Repomixを使用する最も簡単な方法は、コマンドラインインターフェースと同様の機能を提供する`runCli`関数を使用することです：

```javascript
import { runCli, type CliOptions } from 'repomix';

// カスタムオプションで現在のディレクトリを処理
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

`result.packResult`には、処理されたファイルに関する以下の情報が含まれています：
- `totalFiles`: 処理されたファイル数
- `totalCharacters`: 総文字数
- `totalTokens`: 総トークン数（LLMのコンテキスト制限に役立ちます）
- `fileCharCounts`: ファイルごとの文字数
- `fileTokenCounts`: ファイルごとのトークン数

## リモートリポジトリの処理

リモートリポジトリをクローンして処理することもできます：

```javascript
import { runCli, type CliOptions } from 'repomix';

// GitHubリポジトリをクローンして処理する
async function processRemoteRepo(repoUrl) {
  const options = {
    remote: repoUrl,
    output: 'output.xml',
    compress: true
  } as CliOptions;
  
  return await runCli(['.'], process.cwd(), options);
}
```

## コアコンポーネントの使用

より詳細な制御が必要な場合は、Repomixの低レベルAPIを直接使用できます：

```javascript
import { searchFiles, collectFiles, processFiles, TokenCounter } from 'repomix';

async function analyzeFiles(directory) {
  // ファイルを検索して収集
  const { filePaths } = await searchFiles(directory, { /* 設定 */ });
  const rawFiles = await collectFiles(filePaths, directory);
  const processedFiles = await processFiles(rawFiles, { /* 設定 */ });
  
  // トークンをカウント
  const tokenCounter = new TokenCounter('o200k_base');
  
  // 分析結果を返す
  return processedFiles.map(file => ({
    path: file.path,
    tokens: tokenCounter.countTokens(file.content)
  }));
}
```

## 実世界の例

Repomixウェブサイト（[repomix.com](https://repomix.com)）では、ライブラリとしてRepomixを使用してリモートリポジトリを処理しています。実装は[website/server/src/remoteRepo.ts](https://github.com/yamadashy/repomix/blob/main/website/server/src/remoteRepo.ts)で確認できます。 
