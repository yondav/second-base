export const toTitle = str =>
  str
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1).toLowerCase())
    .join(' ');
