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

async function fetchOembed(id) {
  return new Promise((resolve, reject) => {
    https.get(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({}); }
      });
    }).on('error', reject);
  });
}

async function run() {
  const results = [];
  for (const id of tracks) {
    const data = await fetchOembed(id);
    const title = data.title || "Unknown";
    // Title is usually "Song Name" by "Artist"
    // Let's just group by artist or try to guess album
    const thumbnail = data.thumbnail_url || "";
    results.push({ id, title, thumbnail });
    console.log(`Fetched: ${id} - ${title} - ${thumbnail}`);
  }
  
  // Group by thumbnail_url as an approximation for Album!
  results.sort((a, b) => a.thumbnail.localeCompare(b.thumbnail));
  console.log("\n--- SORTED BY ALBUM ARTWORK ---");
  console.log(JSON.stringify(results.map(r => r.id), null, 2));
}

run();
