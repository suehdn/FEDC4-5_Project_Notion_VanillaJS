export default class Component {
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.setup();
    this.initComponent();
    this.setEvent();
    this.render();

    this.initChildComponents();
  }

  setup() {}

  initComponent() {}

  initChildComponents() {}

  setEvent() {}

  render() {}

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }
}
