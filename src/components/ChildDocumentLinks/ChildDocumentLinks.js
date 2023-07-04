import { documentSvg } from '../../utils/svgTemplates.js';
import './ChildDocumentLinks.css';

export default class ChildDocumentLinks {
  constructor({
    $target,
    initialState = {
      documents: [],
    },
  }) {
    this.$target = $target;
    this.state = initialState;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { documents } = this.state;

    const linkItem = ({ id, title }) => `
      <a class="child-document-links__link" href="/documents/${id}">
        <span>${documentSvg()}</span>
        <span class="child-document-links__link--text">${title || '제목 없음'}</span>
      </a>
    `;

    this.$target.innerHTML = `${documents.map(linkItem).join('')}`;
  }
}
