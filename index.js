document.addEventListener('DOMContentLoaded', () => {
  // On initial page load, you can optionally load articles
  // loadArticles('WS_Crypto'); // Uncomment if you want to load on page load
});

async function generateArticles(table) {
  console.log(`Triggering n8n refresh for ${table.toUpperCase()}...`);
  try {
    const res = await fetch('https://lenot344.app.n8n.cloud/webhook/generate-articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table }),
    });

    if (!res.ok) throw new Error('Webhook call failed');

    console.log(`Webhook triggered, waiting to load ${table}... (1 Min)`);
    setTimeout(() => loadArticles(table), 60000); // Wait 3 minutes
  } catch (err) {
    console.error(`Refresh error (${table}):`, err);
  }
}

async function loadArticles(table) {
  const url = `https://lenot344.app.n8n.cloud/webhook/get-articles`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table })
    });

    const responseText = await res.text();
    console.log('Raw response:', responseText);
    console.log('Response status:', res.status);

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed data:', data);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
    }

    const containerIdMap = {
      WS_AI: 'display-ai',
      WS_Crypto: 'display-crypto',
      WS_ML: 'display-ml'
    };
    const containerId = containerIdMap[table] || 'ai';
    const container = document.querySelector(`#${containerId} .articles`);
    if (!container) {
      console.error(`Articles container not found for table ${table}`);
      return;
    }

    container.innerHTML = ''; // Clear previous content

    // Normalize data to an array
    const articles = Array.isArray(data) ? data : [data];

    console.log('Articles to display:', articles);

    if (articles.length === 0) {
      container.innerHTML = '<div class="article-block"><p>No articles found.</p></div>';
      return;
    }

    articles.forEach((article, index) => {
      console.log(`Processing article ${index}:`, article);

      const block = document.createElement('div');
      block.className = 'article-block';
      block.contentEditable = true;

      const title = article.title || article.id || `Article ${index + 1}`;
      const content = article.content || article.Content || 'No content available';

      block.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
      container.appendChild(block);
    });

    console.log(`Loaded ${articles.length} article(s) successfully`);
  } catch (err) {
    console.error(`Error loading ${table} articles:`, err);

    const container = document.querySelector('.articles');
    if (container) {
      container.innerHTML = '<div class="article-block"><p>Error loading articles. Check console for details.</p></div>';
    }
  }
}

function execCmd(command, value = null) {
  document.execCommand(command, false, value);
}

function insertEmoji() {
  const emoji = prompt("Enter emoji to insert:");
  if (emoji) {
    document.execCommand('insertText', false, emoji);
  }
}

function postContent() {
  const blocks = document.querySelectorAll('.article-block');
  const contents = [];

  blocks.forEach(block => {
    contents.push(block.innerHTML);
  });

  console.log("Collected content for POST:", contents);

  alert("POSTED! (Console has the data)");
  // You can replace this with a fetch() call to n8n if needed
}
