import { saveCursorPointer, restoreCursorPointer } from '../../utils/cursor.js';

export default class ContentEditor {
  constructor({ $target, initialState, onChange }) {
    this.$target = $target;
    this.state = initialState;
    this.onChange = onChange;

    this.initEvents();
    this.render();
    // this.$target.innerHTML = `ㅎㅎ <div>메롱</div> <div><h1><span>첫번째노드는이녀석입니다</span><span>깊은 곳</span></h1></div>`;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    let isComposing = false;

    this.$target.addEventListener('compositionstart', (e) => {
      isComposing = true;
    });

    this.$target.addEventListener('compositionend', (e) => {
      isComposing = false;
      this.onChange(e.target.innerHTML);
    });

    this.$target.addEventListener('input', (e) => {
      if (isComposing) return;
      this.onChange(e.target.innerHTML);
    });
  }

  render() {
    const { state } = this;
    if (!state) return;

    // const content = state.split('\n').join('<br>');
    // const cursor = saveCursorPointer(this.$target);
    // this.$target.innerHTML = content;
    // restoreCursorPointer(this.$target, cursor);
  }
}
