import { getDocuments, addDocument, removeDocument } from '../apis/api.js';
import storage from '../utils/storage.js';
import { OPENED_DOCUMENTS } from '../constants/storageKeys.js';

export default class DocumentStore {
  constructor({
    initialState = {
      openedDocuments: {},
      documents: [],
    },
  }) {
    this.state = initialState;
  }

  setState(nextState) {
    this.state = nextState;
  }

  toggleOpened(documentId) {
    const openedDocuments = { ...this.state.openedDocuments };
    if (openedDocuments[documentId]) delete openedDocuments[documentId];
    else openedDocuments[documentId] = true;

    this.setState({ ...this.state, openedDocuments });
    storage.setItem(OPENED_DOCUMENTS, openedDocuments);
  }

  async fetchDocuments() {
    const documents = await getDocuments();
    this.setState({
      ...this.state,
      documents: documents || [],
    });
  }

  async addDocument(title, parent) {
    await addDocument(title, parent);
  }

  async removeDocument(documentId) {
    await removeDocument(documentId);
  }
}
