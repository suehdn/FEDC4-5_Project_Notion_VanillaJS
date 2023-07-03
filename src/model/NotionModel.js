import { createDocument, getDocument, getDocumentList } from '@api/document';

export default class NotionModel {
  constructor(documentId) {
    this.state = {
      documentId,
      documentList: [],
      documentData: {},
    };

    this.init();
  }

  init() {
    this.fetchDocumentList();
    this.fetchDocumentData();
  }

  async createDocument(parent, callback) {
    const newDocument = await createDocument({ title: 'Untitled', parent });
    callback?.(newDocument.id);
  }

  async fetchDocumentList() {
    const documentList = await getDocumentList();
    this.setState({ documentList });
  }

  async fetchDocumentData() {
    const { documentId } = this.state;
    if (documentId === null) return;

    const documentData = await getDocument();
    this.setState({ documentData });
  }

  get documentList() {
    const { documentList } = this.state;
    return documentList;
  }

  get documentData() {
    const { documentData } = this.state;
    return documentData;
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };
  }
}
