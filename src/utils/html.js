import { reservedCharacters } from '@consts/html';

import { getHTMLEntityRegex, getHTMLTagRegex } from './regex';

const htmlEntityRegex = getHTMLEntityRegex();

export default class HTMLString extends String {
  replaceHTMLEntities() {
    return new HTMLString(
      this.replaceAll(htmlEntityRegex, (match) => reservedCharacters[match])
    );
  }

  splitWithTag(tagName) {
    const tags = [];
    const tagRegex = getHTMLTagRegex(tagName);

    let { lastIndex } = tagRegex;

    let match = tagRegex.exec(this);
    if (match === null) {
      tags.push(this);
      return tags;
    }

    while (match) {
      if (lastIndex < match.index) {
        const text = this.substring(lastIndex, match.index);
        tags.push(new HTMLString(text));
      }

      const [, matchText] = match;
      tags.push(new HTMLString(matchText));

      lastIndex = tagRegex.lastIndex;
      match = tagRegex.exec(this);
    }

    return tags;
  }
}
