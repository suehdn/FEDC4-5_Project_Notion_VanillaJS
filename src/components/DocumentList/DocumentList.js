import { SIDEBAR } from '@consts/target';

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
    this.$documentList.className = SIDEBAR.DOCUMENT_LIST;

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
      if (!$button) {
        history.push(`/documents/${id}`);
        return;
      }
      const { className } = $button;

      if (
        className === SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON
      ) {
        this.hanldeDeleteButtonClick(id);
        return;
      }

      if (
        className ===
        SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON
      ) {
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
