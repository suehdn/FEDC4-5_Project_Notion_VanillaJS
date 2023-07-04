import HTMLString from './html';
import MarkDownString from './markdown';

const parse = (string) => {
  if (!string) return '';

  const markDownString = new MarkDownString(string);

  const html = markDownString
    .replaceReservedCharacters()
    .splitWithNewLine()
    .map((line) => {
      if (line.indexOf('# ') === 0) {
        return `<h1>${line.substring(2)}</h1>`;
      }
      if (line.indexOf('## ') === 0) {
        return `<h2>${line.substring(3)}</h2>`;
      }
      if (line.indexOf('### ') === 0) {
        return `<h3>${line.substring(4)}</h3>`;
      }
      if (line.valueOf() === '') {
        return '<br>';
      }
      return `${line}`;
    })
    .map((line) => `<div>${line}</div>`)
    .join('');

  return html;
};

const stringify = (html) => {
  if (!html) return '';

  const htmlString = new HTMLString(html);

  const string = htmlString
    .splitWithTag('div')
    .map((line) => {
      // div 내부 글자 parsing
      if (line.valueOf() === '<br>') return '';
      // TODO: h1, h2, h3 태그인지 확인
      // TODO: list 태그인지 확인
      return line.replaceHTMLEntities().replaceAll('<br>', '\n');
    })
    .join('\n');
  return string;
};

export const Editor = { parse, stringify };

export const setCaret = () => {};

export const getCaret = () => {};
