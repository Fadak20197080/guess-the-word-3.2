const words = [
  "rocket",
  "galaxy",
  "planet",
  "orbit",
  "astronaut",
  "comet",
  "gravity",
  "launch",
  "module",
  "station",
];

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}
