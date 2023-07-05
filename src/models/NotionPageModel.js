import {
  createDocument,
  deleteDocument,
  getDocument,
  getDocumentList,
  updateDocument,
} from '@api/document';

import { getItem, setItem } from '@utils/localStorage/localStorage';

export default class NotionPageModel {
  constructor() {
    this.documentId = null;
    this.documentList = [];
    this.documentData = {
      id: this.documentId,
      title: '',
      createdAt: '',
      updatedAt: '',
      content: null,
      documents: [],
    };
  }

  static instance = null;

  static getInstance() {
    if (!NotionPageModel.instance) {
      NotionPageModel.instance = new NotionPageModel();
    }
    return NotionPageModel.instance;
  }

  setDocumentId(id) {
    this.documentId = id;
  }

  async getDocumentList() {
    try {
      const documentList = await getDocumentList();
      this.documentList = documentList;
    } catch (error) {
      console.error(error);
    }
  }

  async getDocumentData() {
    if (this.documentId === null) return;

    try {
      const { documentId } = this;
      const documentData = await getDocument(documentId);
      this.documentData = documentData;
    } catch (error) {
      console.error(error);
    }
  }

  async createDocument(title, parent) {
    try {
      const newDocument = await createDocument({ title, parent });
      this.documentData = newDocument;
    } catch (error) {
      console.error(error);
    }
  }

  async updateDocument(id, document) {
    this.saveDocumentToLocalStorage(document);

    try {
      const newDocument = await updateDocument(id, document);
      this.documentData = newDocument;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDocument(id) {
    try {
      await deleteDocument(id);
    } catch (error) {
      console.error(error);
    }
  }

  getDocumentFromLocalStorage(id) {
    return getItem(`temp-post-${id}`);
  }

  saveDocumentToLocalStorage(document) {
    setItem(`temp-post-${document.id}`, {
      ...document,
      tempSaveDate: new Date(),
    });
  }
}
