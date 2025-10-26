# 三茶.dev（sancha.dev）

三軒茶屋の開発者コミュニティのWebサイトです。

## 概要

三茶.dev（さんちゃデブ）は、三軒茶屋を拠点とする開発者のためのゆるくつながるローカルコミュニティです。経験やスキルレベルに関係なく、「コードを書くのが好き」という共通点でつながる場所を目指しています。

🌐 [https://sancha.dev](https://sancha.dev)

## 技術スタック

- **HTML/CSS**: シンプルな静的サイト
- **Tailwind CSS**: スタイリング
- **Google Forms**: メールフォーム・イベント申し込み（embedded）
- **Markdown**: イベント情報の管理
- **Browser-Sync**: 開発サーバー（自動リロード付き）
- **ビルドツール**: Node.jsスクリプト（共通パーツ、イベントページ生成）

## セットアップ

### 必要な環境

- Node.js (v16以上推奨)
- npm

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/[your-username]/sancha.dev.git
cd sancha.dev

# 依存関係をインストール
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

このコマンドで以下が同時に実行されます：

- Browser-Sync開発サーバー（http://localhost:3000）
- Tailwind CSSのウォッチモード（CSSの変更を自動でコンパイル）
- イベントマークダウンの監視（変更時に自動ビルド）
- ブラウザの自動リロード

### ビルド

```bash
npm run build
```

本番用ビルド：

- CSSを最適化（minify）
- 共通パーツ（ヘッダー・フッター）をHTMLに埋め込み
- イベントページを生成

## プロジェクト構造

```
sancha.dev/
├── index.html          # メインのHTMLファイル ⚠️ ヘッダー/フッターは自動生成
├── src/
│   └── input.css      # Tailwind CSSの入力ファイル
├── dist/
│   └── output.css     # コンパイル済みCSS 🚫 自動生成（編集不可）
├── includes/           # 共通パーツ ✏️ ここを編集
│   ├── header.html    # ヘッダー
│   └── footer.html    # フッター
├── events/             # イベント関連
│   ├── index.html     # イベント一覧ページ ⚠️ イベント一覧部分は自動生成
│   ├── _template.html # イベント詳細テンプレート
│   ├── src/           # イベントのマークダウン ✏️ イベント追加はここ
│   │   └── YYYY-MM-DD.md
│   ├── images/        # イベント用画像
│   └── *.html         # 🚫 自動生成されたページ（編集不可）
├── images/             # 画像ファイル
│   └── organizers/    # オーガナイザー画像
├── scripts/            # ビルドスクリプト
│   ├── build-events.js   # イベントページ生成
│   └── build-includes.js # 共通パーツ埋め込み
├── favicon.ico        # ファビコン
├── ogp.png           # OGP画像
├── tailwind.config.js # Tailwind設定
├── package.json       # npm設定
├── nodemon.json      # ファイル監視設定
├── bs-config.js      # Browser-Sync設定
├── CLAUDE.md         # AI開発アシスタント用ガイド
└── README.md         # このファイル
```

### ファイル編集ガイド

| ファイル/フォルダ       | 編集可否       | 説明                                          |
| ----------------------- | -------------- | --------------------------------------------- |
| ✏️ `/includes/`         | **編集可**     | ヘッダー・フッターの共通パーツ                |
| ✏️ `/events/src/`       | **編集可**     | イベント情報のマークダウンファイル            |
| ✏️ `index.html`         | **編集可**     | メインコンテンツ（ヘッダー/フッター部分除く） |
| ⚠️ `/events/index.html` | **一部編集可** | イベント一覧は自動生成                        |
| 🚫 `/dist/`             | **編集不可**   | 自動生成されるCSS                             |
| 🚫 `/events/*.html`     | **編集不可**   | 自動生成されるイベントページ                  |

## 主なセクション

1. **ヒーローセクション**: キャッチコピーとCTA
2. **Aboutセクション**: コミュニティの説明
3. **活動内容**: もくもく会、勉強会、輪読会、懇親会
4. **こんな方におすすめ**: ターゲットユーザー
5. **メール登録**: Google Formsの埋め込み
6. **オーガナイザー**: 運営メンバー紹介

## デプロイ

### Cloudflare Pagesでの設定（推奨）

現在、Cloudflare Pagesでホスティングされています：

- **ビルドコマンド**: `npm run build`
- **ビルド出力**: ルートディレクトリ
- **ルートディレクトリ**: /
- **自動デプロイ**: mainブランチへのプッシュで自動更新

### その他のホスティングサービス

静的サイトなので、以下のサービスでもホスティング可能：

- GitHub Pages
- Netlify
- Vercel

## カスタマイズ

### カラーテーマの変更

`tailwind.config.js`でカラーを定義しています：

```javascript
colors: {
  primary: '#1a1a1a',    // 黒
  secondary: '#48bb78',  // 緑
  accent: '#e53e3e',     // 赤
}
```

### コンテンツの更新

#### 通常のコンテンツ

- **テキスト**: `index.html`を直接編集
- **画像**: ルートディレクトリに配置し、HTMLで参照
- **スタイル**: `src/input.css`でカスタムCSSを追加

#### ヘッダー・フッターの更新

1. `/includes/header.html` または `/includes/footer.html` を編集
2. 開発中は自動的に反映される
3. 本番用は `npm run build` を実行

⚠️ **注意**: 各HTMLファイル内のヘッダー・フッターは自動生成されるため、直接編集しても意味がありません。必ず `/includes/` 内のファイルを編集してください。

#### イベントの追加

1. `/events/src/` に `YYYY-MM-DD.md` 形式でマークダウンファイルを作成
2. frontmatterでメタ情報を設定：
   ```yaml
   ---
   title: "イベントタイトル"
   date: "2025-02-15"
   time: "14:00-17:00"
   venue: "会場名"
   capacity: 20
   formUrl: "Google FormsのURL"
   formHeight: "1380px"
   ---
   ```
3. 本文にマークダウンでイベント詳細を記述
4. `npm run build` または開発中は自動的にHTMLが生成される

#### 外部URLに遷移させるイベント（リダイレクト）

イベントの詳細ページをこのサイトではなく外部サービス（connpass、Doorkeeper、Note、X のポストなど）に置きたい場合は、frontmatter に `externalUrl` を指定してください。

```yaml
---
title: "○月度 もくもく会"
date: "2025-11-15"
externalUrl: "https://example.com/your-event-page" # 一覧クリック時にこのURLへ遷移します
---
```

この設定をすると以下の挙動になります：

- イベント一覧のカードをクリックすると、`externalUrl` に直接遷移します
- `https://sancha.dev/events/YYYY-MM-DD` と `https://sancha.dev/events/YYYY-MM-DD.html` にアクセスした場合は即座に `externalUrl` へリダイレクトします（静的HTMLのmeta refresh + JSにより実現）
- マークダウン本文は無視されます（表示されません）

補足：`external_url` というスネークケースのキーでも同様に動作します。

#### マークダウンでの機能

- 通常のマークダウン記法
- HTMLタグの直接記述（iframe、カスタムdivなど）
- 画像の埋め込み（`/events/images/` に配置）
- テーブル、コードブロックなど

## メンテナンス

### 定期的な更新

1. **イベント情報**: 活動内容セクションを適宜更新
2. **オーガナイザー**: メンバーの追加・変更時に更新
3. **OGP画像**: SNSでのシェア時の見た目を最適化

### パフォーマンス最適化

- 画像は適切なサイズに圧縮
- 本番環境では`npm run build`でCSSを最小化
- 不要な依存関係は削除

## 貢献

1. Forkしてください
2. Feature branchを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. Branchにプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## ライセンス

ISC License

## お問い合わせ

- Webサイト: [https://sancha.dev](https://sancha.dev)
- X (Twitter): [@labelmake](https://x.com/labelmake)
