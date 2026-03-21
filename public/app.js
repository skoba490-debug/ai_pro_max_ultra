async function drawTarot() {
  const r = await fetch("/api/tarot");
  const data = await r.json();
  document.getElementById("oracle").innerHTML = "<div class='card'>" + data.card + "</div>";
}

async function drawRune() {
  const r = await fetch("/api/rune");
  const data = await r.json();
  document.getElementById("oracle").innerHTML = "<div class='card'>" + data.rune + "</div>";
}

async function drawIching() {
  const r = await fetch("/api/iching");
  const data = await r.json();
  document.getElementById("oracle").innerHTML = "<div class='card'>" + data.hexagram + "</div>";
}

async function ask() {
  const msg = document.getElementById("msg").value;
  const agent = document.getElementById("agent").value;
  const r = await fetch("/api/ai", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({message: msg, agent: agent, session: "user"})
  });
  const data = await r.json();
  document.getElementById("chat").innerHTML += "<p>" + data.reply + "</p>";
  speak(data.reply);
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(u);
}

function voice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Ваш браузер не поддерживает голосовой ввод");
  const rec = new SpeechRecognition();
  rec.onresult = e => { document.getElementById("msg").value = e.results[0][0].transcript; }
  rec.start();
}
