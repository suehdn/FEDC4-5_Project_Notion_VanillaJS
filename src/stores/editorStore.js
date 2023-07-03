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

  setState(nextState) {
    this.state = nextState;
  }

  async fetchDocument(documentId) {
    const remoteDocument = await getDocument(documentId);
    const localDocument = storage.getItem(DOCUMENT(documentId), initialDocument);
    const recentDocument = remoteDocument.updatedAt > localDocument.updatedAt ? remoteDocument : localDocument;

    this.setState({ ...this.state, document: recentDocument });
    return { document: recentDocument, documentId, isLocalData: recentDocument === localDocument };
  }

  saveDocument(timeout = 1000) {
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
    }, timeout);
  }
}
