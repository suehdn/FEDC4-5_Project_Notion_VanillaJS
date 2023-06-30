import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
export default class EditorStore {
  constructor({
    initialState = {
      documentId: 0,
      document: {
        title: '',
        content: '',
      },
    },
  }) {
    this.state = initialState;
  }

  setDocumentId(id) {
    this.state.documentId = id;
  }

  setDocument(document) {
    this.state.document = document;
    this._update();
  }

  _update() {
    const { state } = this;
    const { title, content } = state.document;
    if (title === '' && content === '') return;

    storage.setItem(DOCUMENT(state.documentId), state.document);

    // TODO: API 요청을 디바운스로 해야합니다.
  }
}
