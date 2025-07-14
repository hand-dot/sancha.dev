const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const { loadInclude } = require('./build-includes');

// マークダウンの設定（HTMLを許可）
marked.setOptions({
  breaks: true,
  gfm: true,
  sanitize: false // HTMLタグを許可
});

// イベントソースディレクトリ
const eventsDir = path.join(__dirname, '..', 'events', 'src');
const eventsOutputDir = path.join(__dirname, '..', 'events');
const templatePath = path.join(eventsOutputDir, '_template.html');

// テンプレートを読み込む
function loadTemplate() {
  return fs.readFileSync(templatePath, 'utf8');
}

// イベント一覧ページのデータを収集
const eventsList = [];

// マークダウンファイルを処理
function processMarkdownFile(filename) {
  const filePath = path.join(eventsDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // frontmatterとコンテンツを分離
  const { data, content } = matter(fileContent);
  
  // マークダウンをHTMLに変換
  const htmlContent = marked(content);
  
  // イベント一覧用のデータを保存
  eventsList.push({
    ...data,
    slug: path.basename(filename, '.md'),
    url: `/events/${path.basename(filename, '.md')}.html`
  });
  
  // ヘッダーとフッターを読み込む（警告コメント付き）
  const headerWarning = '<!-- ⚠️ 警告: このヘッダーは自動生成されます。変更は /includes/header.html で行ってください ⚠️ -->';
  const headerContent = headerWarning + '\n' + loadInclude('header');
  const footerWarning = '<!-- ⚠️ 警告: このフッターは自動生成されます。変更は /includes/footer.html で行ってください ⚠️ -->';
  const footerContent = footerWarning + '\n' + loadInclude('footer');
  
  // テンプレートに埋め込む
  const template = loadTemplate();
  let html = template
    .replace(/{{title}}/g, data.title || 'イベント')
    .replace(/{{date}}/g, data.date || '')
    .replace(/{{time}}/g, data.time || '')
    .replace(/{{venue}}/g, data.venue || '')
    .replace(/{{capacity}}/g, data.capacity || '')
    .replace(/{{content}}/g, htmlContent)
    .replace(/{{header}}/g, headerContent)
    .replace(/{{footer}}/g, footerContent);
  
  // 申し込みフォームがある場合は追加
  if (data.formUrl) {
    const formHtml = `
    <section class="py-12 px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold text-center mb-8">イベント申し込みフォーム</h2>
        <div class="w-full max-w-2xl mx-auto">
          <iframe
            src="${data.formUrl}${data.formUrl.includes('?') ? '&' : '?'}embedded=true"
            class="w-full"
            style="height: ${data.formHeight || '1200px'}; min-height: ${data.formHeight || '1200px'};"
            frameborder="0"
            marginheight="0"
            marginwidth="0">
            読み込んでいます...
          </iframe>
        </div>
      </div>
    </section>`;
    html = html.replace('{{form}}', formHtml);
  } else {
    html = html.replace('{{form}}', '');
  }
  
  // HTMLファイルを出力
  const outputPath = path.join(eventsOutputDir, `${path.basename(filename, '.md')}.html`);
  fs.writeFileSync(outputPath, html);
  console.log(`Generated: ${outputPath}`);
}

// イベント一覧ページを生成
function generateEventsList() {
  // 日付でソート（新しい順）
  eventsList.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const listHtml = eventsList.map(event => {
    const eventDate = new Date(event.date);
    const isPast = eventDate < new Date();
    
    return `
    <a href="${event.url}" class="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow ${isPast ? 'opacity-60' : ''}">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold">${event.title}</h3>
        ${isPast ? '<span class="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">終了</span>' : ''}
      </div>
      <p class="text-gray-600">
        <span class="block">📅 ${event.date} ${event.time || ''}</span>
        ${event.venue ? `<span class="block">📍 ${event.venue}</span>` : ''}
        ${event.capacity ? `<span class="block">👥 定員 ${event.capacity}名</span>` : ''}
      </p>
    </a>`;
  }).join('\n');
  
  const indexPath = path.join(eventsOutputDir, 'index.html');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  const updatedIndex = indexContent.replace('{{events_list}}', listHtml);
  fs.writeFileSync(indexPath, updatedIndex);
  console.log('Generated events list');
}

// メイン処理
function main() {
  // srcディレクトリ内のマークダウンファイルを処理
  if (fs.existsSync(eventsDir)) {
    const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.md'));
    
    files.forEach(file => {
      processMarkdownFile(file);
    });
    
    // イベント一覧を生成
    generateEventsList();
  } else {
    console.log('No markdown files found in events/src/');
  }
}

main();