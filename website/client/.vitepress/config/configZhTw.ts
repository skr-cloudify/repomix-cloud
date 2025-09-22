import { type DefaultTheme, defineConfig } from 'vitepress';

export const configZhTw = defineConfig({
  lang: 'zh-TW',
  description: '將程式碼庫打包成AI友好的格式',
  themeConfig: {
    nav: [
      { text: '指南', link: '/zh-tw/guide/' },
      { text: '加入 Discord', link: 'https://discord.gg/wNYzTwZFku' },
    ],
    sidebar: {
      '/zh-tw/guide/': [
        {
          text: '指南',
          items: [
            { text: '開始使用', link: '/zh-tw/guide/' },
            { text: '安裝', link: '/zh-tw/guide/installation' },
            { text: '基本用法', link: '/zh-tw/guide/usage' },
            { text: '提示範例', link: '/zh-tw/guide/prompt-examples' },
            { text: '輸出格式', link: '/zh-tw/guide/output' },
            { text: '命令行選項', link: '/zh-tw/guide/command-line-options' },
            { text: '遠端倉庫處理', link: '/zh-tw/guide/remote-repository-processing' },
            { text: '配置', link: '/zh-tw/guide/configuration' },
            { text: '自定義指令', link: '/zh-tw/guide/custom-instructions' },
            { text: '註釋移除', link: '/zh-tw/guide/comment-removal' },
            { text: '程式碼壓縮', link: '/zh-tw/guide/code-compress' },
            { text: '安全性', link: '/zh-tw/guide/security' },
            { text: 'MCP 伺服器', link: '/zh-tw/guide/mcp-server' },
            { text: 'GitHub Actions', link: '/zh-tw/guide/github-actions' },
            {
              text: '技巧與竅門',
              items: [{ text: '最佳實踐', link: '/zh-tw/guide/tips/best-practices' }],
            },
            {
              text: '開發',
              items: [
                { text: '貢獻指南', link: '/zh-tw/guide/development/' },
                { text: '環境配置', link: '/zh-tw/guide/development/setup' },
                { text: '作為庫使用 Repomix', link: '/zh-tw/guide/development/using-repomix-as-a-library' },
              ],
            },
          ],
        },
      ],
    },
  },
});

export const configZhTwSearch: DefaultTheme.LocalSearchOptions['locales'] = {
  'zh-TW': {
    translations: {
      button: {
        buttonText: '搜尋',
        buttonAriaLabel: '搜尋',
      },
      modal: {
        noResultsText: '未找到相關結果',
        resetButtonTitle: '清除搜尋',
        backButtonTitle: '返回',
        displayDetails: '顯示詳情',
        footer: {
          selectText: '選擇',
          navigateText: '切換',
          closeText: '關閉',
        },
      },
    },
  },
};
