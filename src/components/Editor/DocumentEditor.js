import { makeRichText, handleNewLine } from '../../utils/richEditor.js';
import './DocumentEditor.css';

export default class DocumentEditor {
  constructor({ $target, initialState, onChange }) {
    this.$target = $target;
    this.$title = document.querySelector('.main__title-editor');
    this.$content = document.querySelector('.main__content-editor');

    this.state = initialState;
    this.onChange = onChange;

    this.initEvents();
    this.render();
  }

  setHidden(hidden) {
    if (hidden) this.$target.classList.add('hidden');
    else this.$target.classList.remove('hidden');
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    this.$title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') e.preventDefault(); // 엔터 입력시 개행 방지
    });

    this.$title.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        // 엔터 입력시 커서를 content로 이동
        e.preventDefault();
        this.$content.focus();
        return;
      }
    });

    this.$content.addEventListener('compositionend', (e) => {
      makeRichText(this.$content); // 한글 입력 처리
    });

    this.$content.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleNewLine(this.$content, e); // 개행 처리
    });

    this.$content.addEventListener('keyup', (e) => {
      if (e.isComposing) return;
      makeRichText(this.$content, e.key);
    });

    this.$target.addEventListener('input', (e) => {
      const role = e.target.dataset.role;
      if (!role || !['title', 'content'].includes(role)) return;

      this.onChange({ name: role, value: e.target.innerHTML });
    });
  }

  render() {
    const { title, content } = this.state;

    // const cursor = saveCursorPointer(this.$target);
    this.$title.innerHTML = title;
    this.$content.innerHTML = content;
    // restoreCursorPointer(this.$target, cursor);
  }
}
