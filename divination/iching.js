const hexagrams = [
  "䷀","䷁","䷂","䷃","䷄","䷅","䷆","䷇","䷈","䷉"
];

exports.draw = () => ({
  hexagram: hexagrams[Math.floor(Math.random() * hexagrams.length)]
});
