import AddIcon from '@public/add.svg';
import ExpandIcon from '@public/expand.svg';
import TrashIcon from '@public/trash.svg';

import Component from '@core/Component';

import './DocumentListItem.css';

export default class DocumentListItem extends Component {
  initComponent() {
    const { documentItem, depth } = this.props;

    this.$documentListItem = document.createElement('li');
    this.$documentListItem.dataset.id = documentItem.id;

    this.$documentListItem.innerHTML = `
      <button class="document-list-item-expand-button">
        <img src="${ExpandIcon}" alt="Image" heigth="12" width="12">
      </button>
      <a class="document-list-item-title">${documentItem.title}</a>
      <div class="document-list-button-container">
        <button class="document-delete-button">
          <img src="${TrashIcon}" alt="Image" heigth="14" width="14">
        </button>
        <button class="document-create-inside-button">
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
