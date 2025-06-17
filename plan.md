# 三茶.dev サイト構築 最終指示書

## プロジェクト概要
三軒茶屋の開発者コミュニティ「三茶.dev」のランディングページを、シンプルな技術スタックで構築する。

### 基本情報
- **メインキャッチコピー**: 「今日のコミット、三茶でシェアしよう。」
- **プライマリドメイン**: sancha.dev
- **セカンダリドメイン**: 三茶.dev（sancha.devにリダイレクト）
- **技術スタック**: HTML + Tailwind CSS + Cloudflare Pages
- **外部サービス**: Google Form（メール収集用）

### オーガナイザー
- [@labelmake](https://x.com/labelmake)
- [@kei_english_ca](https://x.com/kei_english_ca)

---

## 開発環境セットアップ

### 1. プロジェクト初期化
```bash
# ディレクトリ作成
mkdir sancha-dev && cd sancha-dev

# Git初期化
git init

# npm初期化
npm init -y
```

### 2. 必要なパッケージインストール
```bash
npm install -D tailwindcss concurrently serve
```

### 3. package.json設定
```json
{
  "name": "sancha-dev",
  "version": "1.0.0",
  "description": "三軒茶屋の開発者コミュニティ",
  "scripts": {
    "dev": "concurrently \"npm run serve\" \"npm run css:watch\"",
    "serve": "serve -p 3000",
    "css:watch": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "css:build": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
    "build": "npm run css:build"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "concurrently": "^8.2.2",
    "serve": "^14.2.1"
  }
}
```

### 4. Tailwind CSS設定
```bash
# Tailwind初期化
npx tailwindcss init

# ディレクトリ作成
mkdir src dist

# 入力CSSファイル作成
cat > src/input.css << EOF
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF
```

### 5. tailwind.config.js更新
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a90e2',
        accent: '#f39c12',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

### 6. ディレクトリ構成
```
sancha-dev/
├── index.html
├── src/
│   └── input.css
├── dist/
│   └── output.css (自動生成)
├── package.json
├── tailwind.config.js
├── .gitignore
└── README.md
```

---

## HTML構造

### index.html基本構造
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>三茶.dev - 三軒茶屋の開発者コミュニティ</title>
    <meta name="description" content="今日のコミット、三茶でシェアしよう。三軒茶屋を拠点とする開発者のためのゆるくつながるローカルコミュニティ。">
    
    <!-- OGP -->
    <meta property="og:title" content="三茶.dev - 三軒茶屋の開発者コミュニティ">
    <meta property="og:description" content="今日のコミット、三茶でシェアしよう。">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sancha.dev">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <link href="./dist/output.css" rel="stylesheet">
</head>
<body>
    <!-- コンテンツ -->
</body>
</html>
```

---

## セクション別コンテンツ

### 1. ヒーローセクション
- メインキャッチコピー: 「今日のコミット、三茶でシェアしよう。」
- サブキャッチコピー: 「開発者のための、ゆるくつながるローカルコミュニティ」
- CTAボタン: 「最新情報を受け取る」→ メールフォームへスクロール

### 2. Aboutセクション
**タイトル**: 三茶.devとは

**本文**: 
三茶.dev（さんちゃデブ）は、三軒茶屋を拠点とする開発者コミュニティです。経験やスキルレベルに関係なく、「コードを書くのが好き」という共通点でつながる場所。カフェ文化が根付く三茶で、コーヒー片手にコードを書き、仕事帰りには一杯飲みながら技術談義を楽しむ。そんな「ローカル×テック」の新しいカタチを目指しています。

**3つの特徴**:
1. 🌱 初心者も、ベテランも
2. 📍 三茶というローカル
3. 🎯 ゆるく、でも真剣に

### 3. 活動内容セクション
1. **もくもく会**: 黙々と、でも一緒に。
2. **勉強会 & LT会**: 知識をシェアし、刺激し合う。
3. **輪読会**: 一冊の技術書を、みんなで読む。
4. **懇親会**: コードの話も、そうじゃない話も。

### 4. こんな方におすすめセクション
- 三軒茶屋周辺で働いている・住んでいる開発者
- 昔三茶に住んでいた、懐かしい街で開発者仲間と会いたい方
- 三茶の美味しいお店を開拓しながら技術交流したい方
- 「三軒茶屋ってどんな街？」と気になっている開発者
- オフラインで技術コミュニティに参加したい方
- 独学でプログラミングを学んでいて、仲間が欲しい方
- 自分の知識をシェアしたい、誰かの知識を吸収したい方
- 技術の話をしながら飲むのが好きな方
- リモートワークで孤独を感じている、誰かと話したい開発者

### 5. メール登録セクション
**タイトル**: 最新情報を受け取る

**Google Form埋め込み**:
```html
<div class="w-full max-w-2xl mx-auto">
    <iframe
        src="YOUR_GOOGLE_FORM_URL"
        class="w-full h-[600px]"
        frameborder="0"
        marginheight="0"
        marginwidth="0">
        読み込んでいます...
    </iframe>
</div>
```

### 6. オーガナイザーセクション
**タイトル**: オーガナイザー
**説明**: 三茶.devを運営しているメンバーです

カード形式で2名のX (Twitter)リンクを表示

### 7. フッター
- © 2025 三茶.dev
- X (Twitter): @sancha_dev
- ハッシュタグ: #三茶dev

---

## Google Form作成ガイド

### フォーム項目
1. メールアドレス（必須）
2. お名前（任意）
3. 興味のある活動（チェックボックス）:
   - もくもく会
   - 勉強会・LT会
   - 輪読会
   - 懇親会
4. その他コメント（任意）

### 埋め込み手順
1. フォーム作成後、「送信」→「<>」アイコンクリック
2. 幅と高さを調整（推奨: 幅640、高さ600）
3. iframeコードのsrc属性のURLをコピー

---

## デプロイ手順

### 1. GitHubリポジトリ作成
```bash
# .gitignore作成
cat > .gitignore << EOF
node_modules/
.DS_Store
dist/output.css
EOF

# コミット
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/hand-dot/sancha.dev.git
git push -u origin main
```

### 2. Cloudflare Pages設定
1. Cloudflareダッシュボード → Workers & Pages
2. Create application → Pages → Connect to Git
3. GitHubアカウント連携 → リポジトリ選択
4. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `/`
5. Deploy

### 3. カスタムドメイン設定

#### sancha.dev（プライマリ）
1. Pages → Custom domains → Add custom domain
2. `sancha.dev`入力 → Add domain
3. DNSレコードが自動作成される

#### 三茶.dev（リダイレクト）
1. Cloudflareでドメイン追加（既に管理している場合はスキップ）
2. お名前.comでネームサーバーをCloudflareに変更
3. Page Rules設定:
   ```
   URL: *三茶.dev/*
   設定: Forwarding URL (301)
   宛先: https://sancha.dev/$1
   ```

---

## 開発ワークフロー

### 開発開始
```bash
npm run dev
# http://localhost:3000 で確認
```

### 変更をデプロイ
```bash
git add .
git commit -m "Update: 説明"
git push
# Cloudflare Pagesが自動デプロイ
```

---

## チェックリスト

### 開発環境
- [x] Node.js/npmインストール済み
- [x] プロジェクトディレクトリ作成
- [x] npm install完了
- [x] Tailwind CSS設定完了

### コンテンツ
- [x] 全セクションのHTML作成
- [x] レスポンシブデザイン対応
- [x] Google Form作成・埋め込み
- [ ] OGP画像作成（オプション）

### デプロイ
- [x] GitHubリポジトリ作成
- [ ] Cloudflare Pages連携
- [ ] sancha.devドメイン設定
- [ ] 三茶.devリダイレクト設定
- [ ] SSL証明書確認

### 最終確認
- [ ] 両ドメインでアクセス可能
- [ ] リダイレクト動作確認
- [ ] フォーム送信テスト
- [ ] モバイル表示確認

---

## トラブルシューティング

### ビルドエラー
- `dist`フォルダが存在することを確認
- `npm run css:build`を手動実行

### ドメインが反映されない
- DNS伝播待ち（最大48時間）
- Cloudflareのプロキシ設定確認

### Tailwind CSSが反映されない
- `npm run dev`が実行中か確認
- HTMLファイルのクラス名確認
- ブラウザキャッシュクリア

---

## 備考
- 将来的な機能追加は外部サービス連携で対応
- 複雑な機能が必要になったらNext.js等への移行を検討
- 現時点ではシンプルさと開発速度を優先

以上で三茶.devサイトの構築が完了します。