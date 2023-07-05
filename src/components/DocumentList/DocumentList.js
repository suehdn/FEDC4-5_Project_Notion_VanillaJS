import { createDocument, deleteDocument } from '@api/document';

import { history } from '@utils/router';

import Component from '@core/Component';

import DocumentListItem from '@components/DocumentList/Item/DocumentListItem';

import './DocumentList.css';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };
  }

  initComponent() {
    this.$documentList = document.createElement('ul');
    this.$documentList.className = 'document-list';

    this.$target.appendChild(this.$documentList);
  }

  handleCreateIndsideButtonClick = async (id) => {
    const newDocument = await createDocument({ title: 'Untitled', parent: id });
    history.push(`/documents/${newDocument.id}`);
  };

  hanldeDeleteButtonClick = async (id) => {
    await deleteDocument(id);
    history.push('/');
  };

  setEvent() {
    this.$documentList.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');

      if (!$li) return;
      const { id } = $li.dataset;

      const $button = target.closest('button');
      const { className } = $button;

      if (className === 'document-delete-button') {
        this.hanldeDeleteButtonClick(id);
        return;
      }

      if (className === 'document-create-inside-button') {
        this.handleCreateIndsideButtonClick(id);
        return;
      }
      history.push(`/documents/${id}`);
    });
  }

  createDocumentItem(item, depth = 1) {
    const $div = document.createElement('div');

    new DocumentListItem($div, {
      documentItem: item,
      depth,
    });

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
