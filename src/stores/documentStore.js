export default class DocumentStore {
  constructor() {
    this.state = {
      title: '',
      content: '',
    }
  }

  setTitle(value) {
    this.state.title = value;
  }

  setContent(value) {
    this.state.content = value;
  }
}
