export default class SidebarStore {
  constructor() {
    this.state = [];
  }

  setState(nextState) {
    this.state = nextState;
  }
}