const memory = {};

exports.save = (session, msg) => {
  if (!memory[session]) memory[session] = [];
  memory[session].push({ msg, time: Date.now() });
};

// Очистка сообщений старше 7 дней
setInterval(() => {
  const now = Date.now();
  for (let s in memory) {
    memory[s] = memory[s].filter(m => now - m.time < 7*24*60*60*1000);
  }
}, 60000);
