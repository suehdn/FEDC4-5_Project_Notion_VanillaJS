import { saveCursorPointer, restoreCursorPointer } from "../../utils/cursor.js";

export default class DocumentContent {
  constructor({ $target, initialState, onChange }) {
    this.$target = $target;
    this.state = initialState;
    this.onChange = onChange;

    this.initEvents();
    this.render();
    // this.$target.innerHTML = `<div>우하하</div><h1><div><span>이렇게 긴곳인데 찾을수있겠어요?</span></div></h2>`;
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

    const content = state.split('\n').join('<br>');
    const cursor = saveCursorPointer(this.$target);
    this.$target.innerHTML = content;
    restoreCursorPointer(this.$target, cursor);

    console.log(content);
  }
}
