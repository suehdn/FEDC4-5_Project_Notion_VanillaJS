export default class DocumentStore {
  constructor() {
    this.state = {
      title: '',
      content: '',
    }
  }

  setState(nextState) {
    this.state = nextState;
  }

  setTitle(value) {
    this.state.title = value;
  }

  setContent(value) {
    this.state.content = value;
  }
}
