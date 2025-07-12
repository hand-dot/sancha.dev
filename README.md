# 三茶.dev（sancha.dev）

三軒茶屋の開発者コミュニティのWebサイトです。

## 概要

三茶.dev（さんちゃデブ）は、三軒茶屋を拠点とする開発者のためのゆるくつながるローカルコミュニティです。経験やスキルレベルに関係なく、「コードを書くのが好き」という共通点でつながる場所を目指しています。

🌐 [https://sancha.dev](https://sancha.dev)

## 技術スタック

- **HTML/CSS**: シンプルな静的サイト
- **Tailwind CSS**: スタイリング
- **Google Forms**: メールフォーム（embedded）
- **開発サーバー**: `serve`パッケージ

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
- 開発サーバー（http://localhost:3000）
- Tailwind CSSのウォッチモード（CSSの変更を自動でコンパイル）

### ビルド

```bash
npm run build
```

本番用にCSSを最適化（minify）します。

## プロジェクト構造

```
sancha.dev/
├── index.html          # メインのHTMLファイル
├── src/
│   └── input.css      # Tailwind CSSの入力ファイル
├── dist/
│   └── output.css     # コンパイル済みCSS（自動生成）
├── favicon.ico        # ファビコン
├── ogp.png           # OGP画像
├── kyohei.jpg        # オーガナイザー画像
├── kei.jpg           # オーガナイザー画像
├── poteboy.jpg       # オーガナイザー画像
├── tailwind.config.js # Tailwind設定
├── package.json       # npm設定
└── README.md         # このファイル
```

## 主なセクション

1. **ヒーローセクション**: キャッチコピーとCTA
2. **Aboutセクション**: コミュニティの説明
3. **活動内容**: もくもく会、勉強会、輪読会、懇親会
4. **こんな方におすすめ**: ターゲットユーザー
5. **メール登録**: Google Formsの埋め込み
6. **オーガナイザー**: 運営メンバー紹介

## デプロイ

静的サイトなので、以下のサービスでホスティング可能です：

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

ビルドコマンド: `npm run build`  
公開ディレクトリ: ルートディレクトリ

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

- **テキスト**: `index.html`を直接編集
- **画像**: ルートディレクトリに配置し、HTMLで参照
- **スタイル**: `src/input.css`でカスタムCSSを追加

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