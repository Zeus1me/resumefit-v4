export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  var key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: "API key not configured" });
  try {
    var r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify(req.body)
    });
    var d = await r.json();
    return res.status(r.status).json(d);
  } catch (e) { return res.status(500).json({ error: e.message }); }
}
