import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

/* ---------- PATH FIX (для Render) ---------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------- CONFIG ---------- */
const PORT = process.env.PORT || 10000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

/* ---------- ROOT FIX (убирает Cannot GET /) ---------- */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ---------- HEALTH CHECK (Render любит это) ---------- */
app.get("/health", (req, res) => {
  res.send("OK");
});

/* ---------- GPT API ---------- */
app.post("/api/chat", async (req, res) => {
  try {
    if (!OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key missing" });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Ты AI Pro Max. Отвечай чётко, умно и по делу." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ error: "Bad response from OpenAI" });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ error: "Server crashed" });
  }
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log("🔥 AI PRO MAX работает на порту " + PORT);
});