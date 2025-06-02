// Change these to your real n8n webhook URLs
const URL_POST_ENDPOINT = 'https://lenot344.app.n8n.cloud/webhook/url-generate';
const TEXT_POST_ENDPOINT = 'https://your-n8n-instance/webhook/text-handler';
const TEXT_DELETE_ENDPOINT = 'https://your-n8n-instance/webhook/delete-handler';

const containerIdMap = {
    WS_AI_LINK: 'post-url',
    WS_AI_TEXT: 'post-text',
};

// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg

// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg

// fdsfsssssfdfd<fdfgg
// fdsfsssssfdfd<fdfgg// fdsfsssssfdfd<fdfgg
async function postURL() {
  const urlInput = document.getElementById('urlInput').value;

  try {
    const response = await fetch('https://your-n8n-webhook-url.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: urlInput })
    });

    // Parse the JSON response
    const json = await response.json();

    // Show the content in the result textarea
    document.getElementById('textResult').value = json.content || 'No content returned';

  } catch (error) {
    console.error('Error sending URL:', error);
    document.getElementById('textResult').value = 'Error retrieving content.';
  }
}


function postText(table) {
  const text = document.getElementById('textInput').value;
  fetch(TEXT_POST_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text })
  })
  .then(res => res.json())
  .then(data => alert('Posted!'))
  .catch(err => console.error(err));
}

function deleteRecord(table) {
  const recordID = prompt("Enter Airtable Record ID to delete:");
  if (!recordID) return;
  fetch(TEXT_DELETE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recordID })
  })
  .then(res => res.json())
  .then(data => alert('Deleted!'))
  .catch(err => console.error(err));
}

// Basic Text Editing
function formatText(cmd) {
  document.execCommand(cmd, false, null);
}

function highlightText() {
  document.execCommand('backColor', false, 'yellow');
}

function insertList() {
  document.getElementById('textInput').value += '\n• ';
}

function insertEmoji() {
  document.getElementById('textInput').value += '😊';
}
