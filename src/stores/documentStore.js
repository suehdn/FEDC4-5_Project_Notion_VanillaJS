import { getDocuments } from '../apis/api.js';
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

  /**
   * 상태에 저장된 문서 목록에서 특정 문서의 내용을 수정합니다.
   * @param {number} documentId 수정할 문서의 ID
   * @param {object} newDocument 문서의 내용
   */
  updateDocument(documentId, newDocument) {
    const makeNewDocuments = (documentId, newDocument, documents) => {
      return documents.map((currentDocument) => {
        if (currentDocument.id === documentId) return { ...currentDocument, ...newDocument };
        if (currentDocument.documents.length > 0)
          return {
            ...currentDocument,
            documents: makeNewDocuments(documentId, newDocument, currentDocument.documents),
          };

        return currentDocument;
      });
    };

    const newDocuments = makeNewDocuments(documentId, newDocument, this.state.documents);
    this.setState({ ...this.state, documents: newDocuments });
  }

  /**
   * 특정 문서까지 도달하기 위해 거쳐야 할 문서들의 경로를 반환합니다.
   * @param {number} documentId 찾으려는 문서의 ID
   * @param {array} documents 찾으려는 문서가 존재하는 문서들의 배열로, 기본값은 전체 문서 목록입니다.
   * @returns
   */
  findDocumentRoute(documentId, documents = this.state.documents) {
    for (const currentDocument of documents) {
      if (currentDocument.id === documentId) return [currentDocument];
      if (currentDocument.documents.length > 0) {
        const routes = this.findDocumentRoute(documentId, currentDocument.documents);
        if (routes.length > 0) return [currentDocument, ...routes];
      }
    }

    return [];
  }
}
