import { saveCursorPointer, restoreCursorPointer } from '../../utils/cursor.js';

export default class DocumentEditor {
  constructor({ $target, initialState, onChange }) {
    this.$target = $target;
    this.$title = document.querySelector('.title-editor');
    this.$content = document.querySelector('.content-editor');

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
    // let isComposing = false;

    // this.$content.addEventListener('compositionstart', (e) => {
    //   isComposing = true;
    // });

    // this.$content.addEventListener('compositionend', (e) => {
    //   isComposing = false;
    //   this.onChange(e.target.innerHTML);
    // });

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

    this.$target.addEventListener('input', (e) => {
      const role = e.target.dataset.role;
      if (!role || !['title', 'content'].includes(role)) return;
      // if (isComposing) return;

      this.onChange({ name: role, value: e.target.innerHTML });
    });
  }

  render() {
    const { state } = this;
    if (!state) return;

    const content = state.content.split('\n').join('<br>');
    // const cursor = saveCursorPointer(this.$target);
    this.$title.innerHTML = state.title;
    this.$content.innerHTML = content;
    // restoreCursorPointer(this.$target, cursor);
  }
}
