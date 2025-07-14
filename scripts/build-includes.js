const fs = require("fs");
const path = require("path");

// インクルードディレクトリ
const includesDir = path.join(__dirname, "..", "includes");

// インクルードファイルを読み込む
function loadInclude(name) {
  const includePath = path.join(includesDir, `${name}.html`);
  if (fs.existsSync(includePath)) {
    return fs.readFileSync(includePath, "utf8");
  }
  return "";
}

// HTMLファイルを処理
function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // ヘッダーを置換
  const headerContent = loadInclude("header");

  // インクルードコメントを探して置換
  const headerWarning =
    "<!-- ⚠️ 警告: このヘッダーは自動生成されます。変更は /includes/header.html で行ってください ⚠️ -->";
  content = content.replace(
    /<!-- include:header -->[\s\S]*?<!-- \/include:header -->/g,
    `<!-- include:header -->\n${headerWarning}\n${headerContent}\n<!-- /include:header -->`
  );

  // フッターを置換
  const footerContent = loadInclude("footer");
  const footerWarning =
    "<!-- ⚠️ 警告: このフッターは自動生成されます。変更は /includes/footer.html で行ってください ⚠️ -->";
  content = content.replace(
    /<!-- include:footer -->[\s\S]*?<!-- \/include:footer -->/g,
    `<!-- include:footer -->\n${footerWarning}\n${footerContent}\n<!-- /include:footer -->`
  );

  // ファイルを書き戻す
  fs.writeFileSync(filePath, content);
  console.log(`Processed: ${filePath}`);
}

// メイン処理
function main() {
  // index.htmlを処理
  const indexPath = path.join(__dirname, "..", "index.html");
  if (fs.existsSync(indexPath)) {
    processHtmlFile(indexPath);
  }

  // events/index.htmlを処理
  const eventsIndexPath = path.join(__dirname, "..", "events", "index.html");
  if (fs.existsSync(eventsIndexPath)) {
    processHtmlFile(eventsIndexPath);
  }

  // イベントテンプレートは処理対象外（ビルドスクリプトで処理）
}

// エクスポート（他のスクリプトから使用可能）
module.exports = { processHtmlFile, loadInclude };

// 直接実行された場合
if (require.main === module) {
  main();
}
