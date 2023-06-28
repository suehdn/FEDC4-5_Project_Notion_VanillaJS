import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
export default class EditorStore {
  constructor() {
    this.state = {
      documentId: 0,
      title: '',
      content: '',
    };
  }

  setDocumentId(id) {
    this.state.documentId = id;
    this._update();
  }

  setTitle(value) {
    this.state.title = value;
    this._update();
  }

  setContent(value) {
    this.state.content = value;
    this._update();
  }

  _update() {
    const { state } = this;

    storage.setItem(DOCUMENT(state.documentId), {
      title: state.title,
      content: state.content,
    });

    // TODO: API 요청을 디바운스로 해야합니다.
  }
}
