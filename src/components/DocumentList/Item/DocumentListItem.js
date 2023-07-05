import AddIcon from '@public/add.svg';
import ExpandIcon from '@public/expand.svg';
import TrashIcon from '@public/trash.svg';

import { SIDEBAR } from '@consts/target';

import Component from '@core/Component';

import './DocumentListItem.css';

export default class DocumentListItem extends Component {
  initComponent() {
    const { documentItem, depth } = this.props;

    this.$documentListItem = document.createElement('li');
    this.$documentListItem.dataset.id = documentItem.id;

    this.$documentListItem.innerHTML = `
      <button class="${SIDEBAR.DOCUMENT_LIST_ITEM.EXPAND_BUTTON}">
        <img src="${ExpandIcon}" alt="Image" heigth="12" width="12">
      </button>
      <a class="${SIDEBAR.DOCUMENT_LIST_ITEM.TITLE}">${documentItem.title}</a>
      <div class="${SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.ROOT}">
        <button class="${SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.DELETE_BUTTON}">
          <img src="${TrashIcon}" alt="Image" heigth="14" width="14">
        </button>
        <button class="${SIDEBAR.DOCUMENT_LIST_ITEM.BUTTON_CONTAINER.CREATE_INSIDE_BUTTON}">
          <img src="${AddIcon}" alt="Image" heigth="14" width="14">
        </button>
      </div>
    `;
    this.$documentListItem.style.paddingLeft = `${depth * 10}px`;

    this.$target.appendChild(this.$documentListItem);
  }

  render() {
    const { documentItem } = this.props;
    const $title = this.$documentListItem.querySelector(
      '.document-list-item-title'
    );
    $title.textContent = documentItem.title;
  }
}
