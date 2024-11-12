const requestStatuses = {
  editing: 'editing',
  reviewed: 'reviewed',
  submitted: 'submitted',
  discussing: 'discussing',
};

// A map of words to emojis showing human emotions
const requestEmojis = {
  sad: '😔',
  hot: '🔥',
  cold: '🥶',
  sick: '🤒',
  happy: '😊',
  angry: '🤬',
  tired: '💤',
  hungry: '🍴',
  excited: '🤩',
  thirsty: '💧',
  confused: '🤔',
};

// A map of words to funny emojis
const groupEmojis = {
  rocket: '🚀',
  laptop: '💻',
  fire: '🔥',
  snow: '❄️',
  popcorn: '🍿',
  theater: '🎭',
  target: '🎯',
  love: '❤️‍🔥',
  warning: '⚠️',
  announcement: '📢',
  flag: '🚩',
  angry: '🤬',
  tool: '🛠️',
  trophy: '🏆',
  star: '⭐️',
  party: '🎉',
  construction: '🚧',
  ghost: '👻',
  sparkle: '✨',
  music: '🎵',
  heart: '🫀',
  hat: '🎩',
  scarf: '🧣',
  crown: '👑',
  apple: '🍎',
  banana: '🍌',
  orange: '🍊',
  lemon: '🍋',
  pineapple: '🍍',
  strawberry: '🍓',
  watermelon: '🍉',
  dog: '🐶',
  cat: '🐱',
  mouse: '🐭',
  rabbit: '🐰',
  bear: '🐻',
  panda: '🐼',
};

const cities = {
  ottawa: 'Ottawa',
  toronto: 'Toronto',
  chicago: 'Chicago',
  newYork: 'New York',
  montreal: 'Montréal',
  vancouver: 'Vancouver',
  losAngeles: 'Los Angeles',
};

export { cities, groupEmojis, requestStatuses };
