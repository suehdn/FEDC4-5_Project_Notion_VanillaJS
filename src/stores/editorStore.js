import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
import { debounce } from '../utils/debounce.js';
import { getDocument, modifyDocument } from '../apis/api.js';

export const initialDocument = {
  title: '',
  content: '',
  updatedAt: '1970-01-01T09:00:00.000Z',
};
export default class EditorStore {
  constructor({
    initialState = {
      documentId: 0,
      document: initialDocument,
    },
  }) {
    this.state = initialState;
  }

  setDocumentId(documentId) {
    this.state.documentId = documentId;
  }

  setDocument(document) {
    this.state.document = document;
  }

  async fetchDocument(documentId) {
    const remoteDocument = await getDocument(documentId);
    const localDocument = storage.getItem(DOCUMENT(documentId), initialDocument);

    if (remoteDocument.updatedAt > localDocument.updatedAt) this.setDocument(remoteDocument);
    else this.setDocument(localDocument);
  }

  saveDocument() {
    const { documentId, document } = this.state;
    const { title, content } = document;
    if (title === '' && content === '') return;

    storage.setItem(DOCUMENT(documentId), {
      ...document,
      updatedAt: new Date(),
    });

    debounce(async () => {
      await modifyDocument(document, documentId);
      storage.removeItem(DOCUMENT(documentId));
    }, 1000);
  }
}
