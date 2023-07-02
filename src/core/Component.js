export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.setEvent();
    this.render();
    this.fetchData();
  }

  setup() {}

  mount() {}

  template() {
    return '';
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mount();
  }

  setEvent() {}

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  addEvent(eventType, selector, callback) {
    this.$target.addEventListener(eventType, (event) => {
      if (!event.target.closest(selector)) return;
      callback(event);
    });
  }

  fetchData() {}
}
