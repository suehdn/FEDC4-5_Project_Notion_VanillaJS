import { htmlEntities } from '@consts/html';

import { getReservedCharacterRegex } from './regex';

const reservedCharacterRegex = getReservedCharacterRegex();

export default class MarkDownString extends String {
  replaceReservedCharacters() {
    return new MarkDownString(
      this.replaceAll(reservedCharacterRegex, (match) => htmlEntities[match])
    );
  }

  splitWithNewLine() {
    return this.split('\n').map((line) => new MarkDownString(line));
  }
}
