import './NotionEditorContent.css';

export default class NotionEditorContent {
  constructor({ $target }) {
    this.$content = document.createElement('div');

    this.$content.name = 'content';
    this.$content.contentEditable = true;

    $target.appendChild(this.$content);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    const { content } = this.state;

    const renderedContent =
      content
        ?.split('\n')
        ?.map((line) => line)
        ?.join('<br>') ?? '';

    this.$content.innerHTML = renderedContent;
  }
}
