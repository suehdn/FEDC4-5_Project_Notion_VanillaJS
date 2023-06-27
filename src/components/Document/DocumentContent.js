export default class DocumentContent {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.state = initialState;
    this.initEvents();
    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  initEvents() {
    this.$target.addEventListener('input', (e) => {
      // TODO: 여기에서 자식 컴포넌트들을 어떻게 파싱을 할까요
      console.log(e.target.innerHTML);
    });
  }

  render() {
    this.$target.textContent = '우하하하하';
  }
}
