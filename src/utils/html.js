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
    const tags = [];
    const tagRegex = getHTMLTagRegex(tagName);
    const htmlString = this.valueOf();

    let { lastIndex } = tagRegex;

    let match = tagRegex.exec(htmlString);
    if (match === null) {
      tags.push(htmlString);
      return tags;
    }

    while (match) {
      if (lastIndex < match.index) {
        tags.push(htmlString.substring(lastIndex, match.index));
      }

      const [, matchText] = match;
      tags.push(matchText);

      lastIndex = tagRegex.lastIndex;
      match = tagRegex.exec(htmlString);
    }

    return tags;
  }
}
