import { createDocument } from '@api/document';

import { history } from '@utils/router';

import './DocumentList.css';

export default class DocumentList {
  constructor({ $target }) {
    this.$documentList = document.createElement('ul');
    this.$documentList.className = 'document-list';

    $target.appendChild(this.$documentList);

    this.setEvent();
  }

  handleCreateIndsideButtonClick = async (id) => {
    const newDocument = await createDocument({ title: 'Untitled', parent: id });
    history.push(`/documents/${newDocument.id}`);
  };

  setEvent() {
    this.$documentList.addEventListener('click', (e) => {
      const $li = e.target.closest('li');

      if (!$li) return;

      const { id } = $li.dataset;
      const { className } = e.target;

      if (className === 'document-create-inside-button') {
        this.handleCreateIndsideButtonClick(id);
        return;
      }
      history.push(`/documents/${id}`);
    });
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  createDocumentItem(item, depth = 1) {
    const $div = document.createElement('div');

    const $li = document.createElement('li');
    $li.dataset.id = item.id;
    $li.innerHTML = `
      <a>${item.title}</a>
      <button class="document-create-inside-button">+</button>
    `;
    $li.style.paddingLeft = `${depth * 10}px`;

    $div.appendChild($li);

    const { documents: childItems } = item;

    if (childItems.length > 0) {
      const $ul = document.createElement('ul');
      childItems.forEach((childItem) => {
        $ul.appendChild(this.createDocumentItem(childItem, depth + 1));
      });
      $div.appendChild($ul);
    }

    return $div;
  }

  render() {
    const { documentList } = this.state;
    this.$documentList.innerHTML = '';
    documentList.forEach((document) => {
      const $documentItem = this.createDocumentItem(document);
      this.$documentList.appendChild($documentItem);
    });
  }
}
