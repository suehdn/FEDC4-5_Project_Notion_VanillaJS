import Component from '@core/Component';

import './DocumentListItem.css';

export default class DocumentListItem extends Component {
  initComponent() {
    this.$documentListItem = document.createElement('li');

    this.$target.appendChild(this.$documentListItem);
  }

  render() {
    const { documentItem, depth } = this.props;

    this.$documentListItem.dataset.id = documentItem.id;
    this.$documentListItem.innerHTML = `
      <a>${documentItem.title}</a>
      <button class="document-delete-button">x</button>
      <button class="document-create-inside-button">+</button>
    `;
    this.$documentListItem.style.paddingLeft = `${depth * 10}px`;
  }
}
