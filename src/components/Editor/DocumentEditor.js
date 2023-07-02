import { saveCursorPointer, restoreCursorPointer } from '../../utils/cursor.js';
import { makeRichText } from '../../utils/richEditor.js';
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
    // this.$content.innerHTML = `ㅎㅎ <div>메롱</div> <div><h1><span>첫번째노드는이녀석입니다</span><span>깊은 곳</span></h1></div>`;
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
      if (e.key === 'Enter') return e.preventDefault(); // 엔터 입력시 개행 방지
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
      makeRichText(this.$content);
    });

    this.$content.addEventListener('keyup', (e) => {
      const { $content } = this;
      if (e.isComposing) return;

      makeRichText($content, e.key);
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
