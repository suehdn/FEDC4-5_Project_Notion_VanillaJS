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

  /**
   * 특정 문서까지 도달하기 위해 거쳐야 할 문서들의 경로를 반환합니다.
   * @param {number} documentId 찾으려는 문서의 ID
   * @param {array} documents 찾으려는 문서가 존재하는 문서들의 배열로, 기본값은 전체 문서 목록입니다.
   * @returns 
   */
  findDocumentRoute(documentId, documents = this.state.documents) {
    for (const nowDocument of documents) {
      if (nowDocument.id === documentId) return [nowDocument];
      if (nowDocument.documents.length > 0) {
        const routes = this.findDocumentRoute(documentId, nowDocument.documents);
        if (routes.length > 0) return [nowDocument, ...routes];
      }
    }

    return [];
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
