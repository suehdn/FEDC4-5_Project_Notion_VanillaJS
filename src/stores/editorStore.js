import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
import { debounce } from '../utils/debounce.js';
import { modifyDocument } from '../apis/api.js';
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
    const { documentId, document } = this.state;
    const { title, content } = document;
    if (title === '' && content === '') return;

    storage.setItem(DOCUMENT(documentId), document);

    // TODO: API 요청을 디바운스로 해야합니다.
    debounce(async () => {
      // await modifyDocument(document, documentId);
      console.log(document);
    }, 1000);
  }
}
