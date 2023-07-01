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

  setOpened(documentId, opened) {
    const openedDocuments = { ...this.state.openedDocuments };
    if (opened) openedDocuments[documentId] = true;
    else delete openedDocuments[documentId];

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

  addDocument(title, parent) {
    return addDocument(title, parent);
  }

  removeDocument(documentId) {
    return removeDocument(documentId);
  }
}
