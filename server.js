const express = require("express");
const cors = require("cors");

const tarot = require("./divination/tarot");
const runes = require("./divination/runes");
const iching = require("./divination/iching");
const agents = require("./ai/agents");
const memory = require("./memory/memory");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// API Таро
app.get("/api/tarot", (req, res) => {
  res.json(tarot.draw());
});

// API Руны
app.get("/api/rune", (req, res) => {
  res.json(runes.draw());
});

// API И-Цзин
app.get("/api/iching", (req, res) => {
  res.json(iching.draw());
});

// API AI чат
app.post("/api/ai", (req, res) => {
  const { message, agent, session } = req.body;
  memory.save(session, message);
  const reply = agents.run(agent, message);
  res.json({ reply });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));