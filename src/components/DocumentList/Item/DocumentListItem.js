import './DocumentListItem.css';

export default class DocumentListItem {
  constructor({ $target }) {
    this.$documentListItem = document.createElement('li');

    $target.appendChild(this.$documentListItem);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { documentItem, depth } = this.state;

    this.$documentListItem.dataset.id = documentItem.id;
    this.$documentListItem.innerHTML = `
      <a>${documentItem.title}</a>
      <button class="document-create-inside-button">+</button>
    `;
    this.$documentListItem.style.paddingLeft = `${depth * 10}px`;
  }
}
