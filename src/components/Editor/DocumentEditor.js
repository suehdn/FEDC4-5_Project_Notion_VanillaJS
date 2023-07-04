import {
  handlePreventNewLine,
  handleCursorToContent,
  handleRichContent,
  handleChangeInput,
  handleKeyDown,
  handleShowStyleMenu,
} from './events.js';
import './DocumentEditor.css';

export default class DocumentEditor {
  constructor({
    $target,
    initialState = {
      documentId: 0,
      document: {
        title: '',
        content: '',
      },
    },
    onChange,
  }) {
    this.$target = $target;
    this.$title = document.querySelector('.main__title-editor');
    this.$content = document.querySelector('.main__content-editor');

    this.state = initialState;
    this.onChange = onChange;

    this.initEvents();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;

    if (this.state.documentId === 0) this.$target.classList.add('hidden');
    else this.$target.classList.remove('hidden');

    this.render();
  }

  initEvents() {
    this.$title.addEventListener('keydown', (e) => handlePreventNewLine(e));
    this.$title.addEventListener('keyup', (e) => handleCursorToContent(e, { $content: this.$content }));

    this.$content.addEventListener('compositionend', (e) => handleRichContent(e, { $content: this.$content }));
    this.$content.addEventListener('keydown', (e) => handleKeyDown(e, { $content: this.$content }));
    this.$content.addEventListener('keyup', (e) => handleRichContent(e, { $content: this.$content }));
    this.$content.addEventListener('pointerup', (e) => handleShowStyleMenu(e));

    this.$target.addEventListener('input', (e) => handleChangeInput(e, { onChange: this.onChange }));
  }

  render() {
    const { documentId, document } = this.state;
    if (!documentId || !document) return;

    this.$title.innerHTML = document.title;
    this.$content.innerHTML = document.content;
  }
}
