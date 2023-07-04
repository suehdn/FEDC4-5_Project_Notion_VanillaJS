import CARET from '@consts/caret';

import Caret from './caret';
import HTMLString from './html';
import MarkDownString from './markdown';
import { getCaretSpanTagRegex } from './regex';

let caretPosition = 0;

const caretSpanTagRegex = getCaretSpanTagRegex();

const getCaretPositionInString = (string) => {
  const pos = caretSpanTagRegex.exec(string);
  return pos === null ? 0 : pos.index;
};

const removeCaretFromString = (string) => string.replace(caretSpanTagRegex, '');

const parse = (string) => {
  if (!string) return '';

  const headString = new MarkDownString(string.substring(0, caretPosition))
    .replaceReservedCharacters()
    .valueOf();

  const tailString = new MarkDownString(string.substring(caretPosition))
    .replaceReservedCharacters()
    .valueOf();

  const stringWithCaret = `${headString}${CARET.SPAN(CARET.ID)}${tailString}`;
  const markDownString = new MarkDownString(stringWithCaret);

  const html = markDownString
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

  caretPosition = getCaretPositionInString(string);
  const stringWithoutCaret = removeCaretFromString(string);

  return stringWithoutCaret;
};

const saveCaretPosition = () => {
  Caret.savePosition();
};

const restoreCaretPosition = () => {
  Caret.setPosition();
};

const Editor = { parse, stringify, saveCaretPosition, restoreCaretPosition };

export default Editor;
