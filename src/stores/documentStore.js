import { getDocuments, addDocument, removeDocument } from '../apis/api.js';

export default class DocumentStore {
  constructor() {
    this.state = [];
  }

  setState(nextState) {
    this.state = nextState;
  }

  async fetchDocuments() {
    const documents = await getDocuments();
    this.setState(documents);
  }

  async addDocument(title, parent = null) {
    await addDocument(title, parent);
  }

  async removeDocument(documentId) {
    await removeDocument(documentId);
  }
}
