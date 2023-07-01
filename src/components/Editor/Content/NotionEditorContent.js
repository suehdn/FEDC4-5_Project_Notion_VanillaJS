import './NotionEditorContent.css';

export default class NotionEditorContent {
  constructor({ $target }) {
    this.$content = document.createElement('textarea');

    this.$content.className = 'notion-editor-content';
    this.$content.name = 'content';

    $target.appendChild(this.$content);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { content } = this.state;

    this.$content.innerHTML = content;
  }
}
