import { history } from '@utils/router';

import './DocumentList.css';

export default class DocumentList {
  constructor({ $target }) {
    this.$documentList = document.createElement('ul');
    this.$documentList.className = 'document-list';

    $target.appendChild(this.$documentList);

    this.setEvent();
  }

  setEvent() {
    this.$documentList.addEventListener('click', (e) => {
      const $li = e.target.closest('li');

      if ($li) {
        const { id } = $li.dataset;
        history.push(`/documents/${id}`);
      }
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { documentList } = this.state;
    this.$documentList.innerHTML = documentList
      .map(
        (document) => `
        <li data-id="${document.id}">${document.title}</li>
      `
      )
      .join('');
  }
}
