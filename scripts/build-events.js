const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const matter = require("gray-matter");
const { loadInclude } = require("./build-includes");

// マークダウンの設定（HTMLを許可）
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false, // HTMLタグを許可
});

// イベントソースディレクトリ
const eventsDir = path.join(__dirname, "..", "events", "src");
const eventsOutputDir = path.join(__dirname, "..", "events");
const templatePath = path.join(eventsOutputDir, "_template.html");

// テンプレートを読み込む
function loadTemplate() {
  return fs.readFileSync(templatePath, "utf8");
}

// イベント一覧ページのデータを収集
const eventsList = [];

// マークダウンファイルを処理
function processMarkdownFile(filename) {
  const filePath = path.join(eventsDir, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");

  // frontmatterとコンテンツを分離
  const { data, content } = matter(fileContent);

  // マークダウンをHTMLに変換
  const htmlContent = marked(content);

  // イベント一覧用のデータを保存
  const slug = path.basename(filename, ".md");
  const externalUrl = data.externalUrl || data.external_url; // 両方のキーをサポート
  eventsList.push({
    ...data,
    slug,
    url: externalUrl ? externalUrl : `/events/${slug}.html`,
    isExternal: Boolean(externalUrl),
  });

  // ヘッダーとフッターを読み込む（警告コメント付き）
  const headerWarning =
    "<!-- ⚠️ 警告: このヘッダーは自動生成されます。変更は /includes/header.html で行ってください ⚠️ -->";
  const headerContent = headerWarning + "\n" + loadInclude("header");
  const footerWarning =
    "<!-- ⚠️ 警告: このフッターは自動生成されます。変更は /includes/footer.html で行ってください ⚠️ -->";
  const footerContent = footerWarning + "\n" + loadInclude("footer");

  let html = "";
  if (externalUrl) {
    // 外部URLへリダイレクトするイベント詳細ページを生成
    // NOTE: meta refresh + JS の二重対策。noscript向けリンクも用意。
    html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${(data.title || "イベント").replace(/</g, "&lt;")}</title>
    <meta http-equiv="refresh" content="0; url=${externalUrl}" />
    <link rel="canonical" href="${externalUrl}" />
    <meta name="robots" content="noindex, nofollow" />
    <script>window.location.replace(${JSON.stringify(externalUrl)});</script>
  </head>
  <body>
    <p>外部ページへ移動します: <a href="${externalUrl}">${externalUrl}</a></p>
  </body>
</html>`;
  } else {
    // テンプレートに埋め込む
    const template = loadTemplate();
    html = template
      .replace(/{{title}}/g, data.title || "イベント")
      .replace(/{{date}}/g, data.date || "")
      .replace(/{{time}}/g, data.time || "")
      .replace(/{{venue}}/g, data.venue || "")
      .replace(/{{capacity}}/g, data.capacity || "")
      .replace(/{{content}}/g, htmlContent)
      .replace(/{{header}}/g, headerContent)
      .replace(/{{footer}}/g, footerContent);

    // 申し込みフォームがある場合は追加
    if (data.formUrl) {
      const formHtml = `
    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold mb-8">イベント申し込みフォーム</h2>
        <div class="w-full max-w-2xl mx-auto">
          <iframe
            src="${data.formUrl}${data.formUrl.includes("?") ? "&" : "?"}embedded=true"
            class="w-full"
            style="height: ${data.formHeight || "1200px"}; min-height: ${data.formHeight || "1200px"};"
            frameborder="0"
            marginheight="0"
            marginwidth="0">
            読み込んでいます...
          </iframe>
        </div>
      </div>
    </section>`;
      html = html.replace("{{form}}", formHtml);
    } else {
      html = html.replace("{{form}}", "");
    }
  }

  // ファイル先頭に自動生成警告を追加
  const fileWarning = `<!-- 
⚠️ 警告: このファイルは自動生成されます。直接編集しないでください！
⚠️ イベント情報の編集は /events/src/${filename} で行ってください。
⚠️ This file is auto-generated. Do not edit directly!
⚠️ Edit the source file at /events/src/${filename} instead.
-->
`;

  // HTMLファイルを出力
  const baseName = path.basename(filename, ".md");
  const outputHtmlPath = path.join(eventsOutputDir, `${baseName}.html`);
  fs.writeFileSync(outputHtmlPath, fileWarning + html);
  console.log(`Generated: ${outputHtmlPath}`);

  // 外部URLイベントの場合は拡張子なしアクセス用に /events/{slug}/index.html も生成
  if (externalUrl) {
    const indexDir = path.join(eventsOutputDir, baseName);
    const indexPath = path.join(indexDir, "index.html");
    if (!fs.existsSync(indexDir)) fs.mkdirSync(indexDir, { recursive: true });
    fs.writeFileSync(indexPath, fileWarning + html);
    console.log(`Generated: ${indexPath}`);
  }
}

// イベント一覧ページを生成
function generateEventsList() {
  // 日付でソート（新しい順）
  eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));

  const listHtml = eventsList
    .map((event) => {
      const eventDate = new Date(event.date);
      const isPast = eventDate < new Date();

      // 外部リンクの場合は rel を付与
      const externalAttrs = event.isExternal ? ' rel="noopener"' : "";
      const externalNote = event.isExternal
        ? '<span class="ml-2 text-xs text-gray-500 align-middle">　外部ページに遷移します↗︎</span>'
        : "";

      return `
    <a href="${event.url}" class="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"${externalAttrs}>
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold">${event.title}${externalNote}</h3>
        ${isPast ? '<span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">終了</span>' : ""}
      </div>
      <p class="text-gray-600">
        <span class="block">📅 ${event.date} ${event.time || ""}</span>
        ${event.venue ? `<span class="block">📍 ${event.venue}</span>` : ""}
        ${event.capacity ? `<span class="block">👥 定員 ${event.capacity}</span>` : ""}
      </p>
    </a>`;
    })
    .join("\n");

  const indexPath = path.join(eventsOutputDir, "index.html");
  const indexContent = fs.readFileSync(indexPath, "utf8");
  const listWarning =
    "<!-- ⚠️ 警告: このイベント一覧は自動生成されます。イベントの追加は /events/src/ に.mdファイルを作成してください ⚠️ -->";

  // 1) まずは {{events_list}} プレースホルダを置換（初回セットアップ用）
  let updatedIndex = indexContent.replace("{{events_list}}", listWarning + "\n" + listHtml);

  // 2) 既に置換済みの場合は、gridコンテナの中身をまるごと差し替え
  if (updatedIndex === indexContent) {
    const gridStartRegex = /(<div class="grid gap-6">)/;
    const gridEndRegex = /(\n\s*<\/div>\s*\n\s*<!-- イベントがない場合のメッセージ -->)/; // 次のブロック直前まで

    const startMatch = updatedIndex.match(gridStartRegex);
    const endMatch = updatedIndex.match(gridEndRegex);

    if (startMatch && endMatch) {
      // 先頭から grid start まで、grid本体、grid後の残り、に分割
      const startIndex = updatedIndex.indexOf(startMatch[1]) + startMatch[1].length;
      const endIndex = updatedIndex.indexOf(endMatch[1]);
      updatedIndex =
        updatedIndex.slice(0, startIndex) +
        "\n            " +
        listWarning +
        "\n\n" +
        listHtml +
        "\n          " +
        updatedIndex.slice(endIndex);
    }
  }

  fs.writeFileSync(indexPath, updatedIndex);
  console.log("Generated events list");
}

// メイン処理
function main() {
  // srcディレクトリ内のマークダウンファイルを処理
  if (fs.existsSync(eventsDir)) {
    const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".md"));

    files.forEach((file) => {
      processMarkdownFile(file);
    });

    // イベント一覧を生成
    generateEventsList();
  } else {
    console.log("No markdown files found in events/src/");
  }
}

main();
