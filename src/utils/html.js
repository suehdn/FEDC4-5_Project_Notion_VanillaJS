import reservedCharacters from '@consts/html';

import { getHTMLEntityRegex, getHTMLTagRegex } from './regex';

const htmlEntityRegex = getHTMLEntityRegex();

export default class HTMLString extends String {
  replaceHTMLEntities() {
    return new HTMLString(
      this.replaceAll(htmlEntityRegex, (match) => reservedCharacters[match])
    );
  }

  splitWithTag(tagName) {
    const tagRegex = getHTMLTagRegex(tagName);

    return [...this.matchAll(tagRegex)].map(([, line]) => line);
  }
}
