import './NotionEditorTitle.css';

export default class NotionEditorTitle {
  constructor({ $target }) {
    this.$title = document.createElement('input');

    this.$title.className = 'notion-editor-title';
    this.$title.type = 'text';
    this.$title.name = 'title';
    this.$title.placeholder = 'undefined';

    $target.appendChild(this.$title);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { title } = this.state;

    this.$title.value = title ?? '';
  }
}
