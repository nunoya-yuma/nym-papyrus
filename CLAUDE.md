# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

TypeScriptの学習用Markdownエディターアプリケーション。React + TypeScript + Viteを使用し、CodeMirrorによるエディター機能とmarkedライブラリによるリアルタイムプレビュー機能を提供。

## 開発コマンド

- `npm run dev` - 開発サーバー起動（http://localhost:5173）
- `npm run build` - TypeScriptコンパイル後にビルド実行
- `npm run lint` - ESLintによるコードチェック
- `npm run preview` - ビルド後のアプリをプレビュー

## アーキテクチャ

### コアライブラリ構成
- **@uiw/react-codemirror**: CodeMirrorのReactラッパー、エディター機能を提供
- **@codemirror/lang-markdown**: Markdown構文ハイライト
- **marked**: MarkdownをHTMLに変換するパーサー

### アプリケーション構造
- `App.tsx`: メインコンポーネント、Markdownテキストの状態管理とエディター・プレビューの統合
- `App.css`: Flexboxによる左右分割レイアウト、プレビュー内容のスタイリング

### 状態管理パターン
- `markdownText`をuseStateで管理
- `handleChange`でCodeMirrorの変更を捕捉
- `getPreviewHtml()`でリアルタイム変換
- `dangerouslySetInnerHTML`でHTMLを直接レンダリング

### スタイリング注意点
- `.preview-content em`にGeorgiaフォント適用（イタリック表示を明確化）
- `!important`でイタリックスタイル強制適用
- Flexboxで画面全体を有効活用する設計

## 開発ワークフロー

**すべての新機能開発は以下の手順で実施：**
1. 機能ブランチを作成（例：`git checkout -b feature/file-save`）
2. 機能を実装・テスト
3. 変更をコミット
4. プルリクエスト作成（`gh pr create`）
5. mainブランチへマージ

このワークフローを必ず守ること。直接mainブランチでの作業は禁止。