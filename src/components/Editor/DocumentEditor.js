import { makeRichText, handleNewLine, handleBackspace } from '../../utils/richEditor.js';
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

  setState(nextState) {
    this.state = nextState;
    if (this.state.documentId === 0) this.$target.classList.add('hidden');
    else this.$target.classList.remove('hidden');
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
      if (e.key === 'Backspace') handleBackspace(this.$content, e); // 백스페이스 처리
    });

    this.$content.addEventListener('keyup', (e) => {
      if (e.isComposing) return;
      makeRichText(this.$content, e.key);
    });

    this.$target.addEventListener('input', (e) => {
      const role = e.target.dataset.role;
      if (!role || !['title', 'content'].includes(role)) return;

      setTimeout(() => {
        this.onChange({ name: role, value: e.target.innerHTML });
      }, 100);
    });
  }

  render() {
    const { documentId, document } = this.state;
    if (!documentId || !document) return;
    const { title, content } = document;

    this.$title.innerHTML = title;
    this.$content.innerHTML = content;
  }
}
