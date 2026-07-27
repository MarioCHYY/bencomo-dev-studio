import https from 'https';

const tracks = [
  "6SQLk9HSNketfgs2AyIiMs",
  "2IOFZdYYkFxEHVz1w34PoL",
  "3i058E8uxTsYqJ5NWZzqSj",
  "6uvh0In7u1Xn4HgxOfAn8O",
  "0rzaRSujxA0bKyjJl6vHYq",
  "6qj02zSeEJGWZ4c0dn5QzJ",
  "1mw0RgNXIpYRyyCdBQbLgA",
  "33bURv895AN4FkBvgFo2dx",
  "1IF5UcqRO42D12vYwceOY6",
  "7gtG45ieyQzKtNKobfLd49",
  "3xClevycpBON8bkyxFbAna",
  "0tV6LXuVzJR4yifqwQuNwN",
  "6GteP2UCnpHRWSZTL63QHe",
  "0QPdjsMOUhwouq1NS3HwfQ",
  "0VV0AMmgLBUhzuFedr3F3e",
  "028i7HBfp8uE5epmx5ieMA",
  "56k68P3bFQvnKw89hizJFZ",
  "45S5WTQEGOB1VHr1Q4FuPl",
  "6UelLqGlWMcVH1E5c4H7lY",
  "3jjujdWJ72nww5eGnfs2E7",
  "4jAIqgrPjKLTY9Gbez25Qb",
  "1ZMiCix7XSAbfAJlEZWMCp",
  "6VzcQuzTNTMFnJ6rBSaLH9",
  "5LYMamLv12UPbemOaTPyeV",
  "1qEmFfgcLObUfQm0j1W2CK"
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const results = [];
  for (const id of tracks) {
    const html = await fetchHtml(`https://open.spotify.com/track/${id}`);
    
    let title = "Unknown";
    const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
    if (titleMatch) title = titleMatch[1];
    
    let desc = "Unknown";
    const descMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
    if (descMatch) desc = descMatch[1];
    
    let album = "Unknown Album";
    // Try to find album name in HTML if available. Usually it's in a script tag.
    const albumMatch = html.match(/"album":\{.*?"name":"([^"]+)"/);
    if (albumMatch) album = albumMatch[1];
    
    // Also try to find artist from title
    const artistMatch = title.split(" - ");
    const artist = artistMatch.length > 1 ? artistMatch[1] : "Unknown Artist";

    results.push({ id, title, album, artist, desc });
    console.log(`Fetched: ${id} - Album: ${album}`);
  }
  
  // Sort by album
  results.sort((a, b) => a.album.localeCompare(b.album));
  console.log("\n--- SORTED ---");
  console.log(JSON.stringify(results.map(r => r.id), null, 2));
}

run();
