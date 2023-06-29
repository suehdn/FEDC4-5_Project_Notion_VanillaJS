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

    this.$title.addEventListener('input', e => {
      this.onChange({
        ...this.state,
        title: e.target.value,
      });
    });

    this.$content.addEventListener('input', e => {
      // if (isComposing) return;

      this.onChange({
        ...this.state,
        content: e.target.innerHTML,
      });
    });
  }

  render() {
    const { state } = this;
    if (!state) return;

    const content = state.content.split('\n').join('<br>');
    // const cursor = saveCursorPointer(this.$target);
    this.$title.value = state.title;
    this.$content.innerHTML = content;
    // restoreCursorPointer(this.$target, cursor);
  }
}
