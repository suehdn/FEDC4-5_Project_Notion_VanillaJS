import { saveCursorPointer, restoreCursorPointer } from "../../utils/cursor.js";

export default class DocumentContent {
  constructor({ $target, initialState, onChange }) {
    this.$target = $target;
    this.state = initialState;
    this.onChange = onChange;

    this.initEvents();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    const update = () => {};

    this.$target.addEventListener('input', (e) => {
      this.onChange(e.target.innerHTML);
    });
  }

  render() {
    const { state } = this;
    if (!state) return;

    const content = state.split('\n').join('<br>');
    const cursor = saveCursorPointer(this.$target);

    // this.$target.innerHTML = `<div>우하하</div><h1><div><span>이렇게 긴곳인데 찾을수있겠어요?</span></div></h2>`;
    this.$target.innerHTML = content;

    restoreCursorPointer(this.$target, cursor);
  }
}
