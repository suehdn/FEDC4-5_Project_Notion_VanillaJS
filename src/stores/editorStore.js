export default class EditorStore {
  constructor() {
    this.state = {
      documentId: 0,
      title: '',
      content: '',
    }
  }

  setDocumentId(id) {
    this.state.documentId = id;
  }

  setTitle(value) {
    this.state.title = value;
  }

  setContent(value) {
    this.state.content = value;
  }
}
