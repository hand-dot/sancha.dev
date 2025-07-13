# 三茶.dev プロジェクト情報

このファイルは、Claude（AI）がプロジェクトの構造と運用方法を理解するための情報をまとめたものです。

## プロジェクト概要

三茶.dev（sancha.dev）は三軒茶屋の開発者コミュニティWebサイトです。静的サイトジェネレーターを使わず、シンプルなビルドスクリプトでマークダウンからイベントページを生成します。

## 技術構成

- **フレームワーク**: なし（純粋なHTML）
- **CSS**: Tailwind CSS
- **ビルドツール**: Node.jsカスタムスクリプト
- **開発サーバー**: Browser-Sync（自動リロード付き）
- **ホスティング**: Cloudflare Pages

## ディレクトリ構造

```
/
├── index.html         # メインページ（include:header/footerタグあり）
├── includes/          # 共通パーツ
│   ├── header.html   # 全ページ共通のヘッダー
│   └── footer.html   # 全ページ共通のフッター
├── events/           # イベント関連
│   ├── index.html    # イベント一覧ページ
│   ├── _template.html # イベント詳細のテンプレート
│   ├── src/          # イベントのマークダウンソース
│   └── images/       # イベント用画像
├── scripts/          # ビルドスクリプト
│   ├── build-events.js   # マークダウン→HTML変換
│   └── build-includes.js # ヘッダー/フッター埋め込み
└── dist/             # ビルド成果物（gitignore）
```

## 重要な運用ルール

### 1. ヘッダー・フッターの更新
- `/includes/header.html` または `/includes/footer.html` を編集
- 開発中は自動的に反映される（nodemonが監視）
- 本番用は `npm run build` で全ページに反映
- **重要**: HTMLファイル内のヘッダー・フッターを直接編集しても無意味（ビルド時に上書きされる）
- 各HTMLには警告コメントが自動挿入される

### 2. イベントの追加
- `/events/src/YYYY-MM-DD.md` 形式でファイル作成
- frontmatterは必須（title, date, time, venue, capacity）
- formUrlとformHeightはオプション
- HTMLタグ、iframe、画像の埋め込みが可能

### 3. 開発フロー
```bash
# 開発開始
npm run dev  # localhost:3000で起動、ファイル監視

# ビルド
npm run build  # 本番用ビルド
```

### 4. デプロイ
- mainブランチにプッシュすると自動デプロイ
- Cloudflare Pagesが `npm run build` を実行

## ビルドプロセス

1. **CSS**: Tailwind CSSをコンパイル・最適化
2. **共通パーツ**: header.html/footer.htmlを各ページに埋め込み
3. **イベント**: マークダウンファイルからHTMLを生成

## 注意事項

- `events/*.html`（生成ファイル）はgitignoreされている
- `dist/output.css`もgitignoreされている
- イベントの日付が過去の場合、自動的に「終了」表示される
- URLは拡張子なしでもアクセス可能（`/events/2025-02-15`）

## よくあるタスク

### 新しいイベントを追加
1. `/events/src/2025-03-15.md` を作成
2. frontmatterとコンテンツを記述
3. 開発中は自動的にビルドされる

### ナビゲーションにリンクを追加
1. `/includes/header.html` を編集
2. `npm run build` を実行

### スタイルの変更
1. Tailwindクラスを使用するか、`src/input.css` にカスタムCSSを追加
2. 開発中は自動的に反映される

## トラブルシューティング

- **イベントが反映されない**: nodemonが動作しているか確認
- **スタイルが反映されない**: Tailwind CSSのウォッチモードを確認
- **ビルドエラー**: node_modulesを削除して `npm install` を再実行