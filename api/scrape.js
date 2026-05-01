export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    var url = req.body.url;
    if (!url || !url.startsWith("http")) return res.status(400).json({ error: "Invalid URL" });
    var r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" }, redirect: "follow" });
    if (!r.ok) return res.status(502).json({ error: "Failed to fetch" });
    var html = await r.text();
    var text = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, "\n").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/[ \t]+/g, " ").replace(/\n\s*\n/g, "\n\n").trim();
    if (text.length > 8000) text = text.substring(0, 8000);
    if (text.length < 50) return res.status(422).json({ error: "Could not extract text" });
    return res.status(200).json({ text: text });
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
