import storage from '../utils/storage.js';
import { DOCUMENT } from '../constants/storageKeys.js';
import { debounce } from '../utils/debounce.js';
import { findDocument } from '../helpers/documentHelper.js';
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

  saveDocument(onSuccess = () => {}, timeout = 1000) {
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
      onSuccess();
    }, 10000);
  }

  // TODO: 스토리지에 존재하는 모든 데이터 읽어서 최신일 경우 서버에 modify 요청하기.
  pushStorageDocuments(documents = []) {
    const promises = Object.keys(localStorage)
      .filter((key) => key.startsWith(DOCUMENT()))
      .map((key) => {
        const documentId = Number(key.split('_')[1]);
        const remoteDocument = findDocument(documentId, documents);
        const localDocument = JSON.parse(localStorage.getItem(key));

        return remoteDocument.updatedAt < localDocument.updatedAt ? { key, documentId, localDocument } : null;
      })
      .filter((item) => item !== null)
      .map((item) => {
        const { key, documentId, localDocument } = item;

        return new Promise(async (resolve) => {
          await modifyDocument(localDocument, documentId);
          localStorage.removeItem(key);
          resolve({ documentId, document: localDocument });
        });
      });

    return Promise.all(promises);
  }
}
