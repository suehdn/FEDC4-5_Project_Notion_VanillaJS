import reservedCharacters from '@consts/html';

export const getHTMLTagRegex = (tagName) =>
  new RegExp(`<${tagName}>(.*?)</${tagName}>`, 'g');

export const getHTMLEntityRegex = () =>
  new RegExp(Object.keys(reservedCharacters).join('|'), 'g');
