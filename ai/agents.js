exports.run = (agent, msg) => {
  switch (agent) {
    case "poet":
      return "Поэтический ответ: " + msg;
    case "writer":
      return "AI статья: " + msg;
    case "coder":
      return "AI код: " + msg;
    default:
      return "AI ответ: " + msg;
  }
};
