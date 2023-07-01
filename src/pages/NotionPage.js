import { getDocument, getDocumentList } from '@api/document';

import NotionDocument from '@components/NotionDocument/NotionDocument';
import NotionSidebar from '@components/NotionSidebar/NotionSidebar';

import './NotionPage.css';

export default class NotionPage {
  constructor({ $target }) {
    this.$page = document.createElement('div');
    this.$page.className = 'notion-page';
    $target.appendChild(this.$page);

    this.$sidebar = new NotionSidebar({ $target: this.$page });
    this.$document = new NotionDocument({ $target: this.$page });
  }

  async setState(nextState) {
    this.state = nextState;

    const documents = await getDocumentList();
    this.$sidebar.setState(documents);

    const document = await this.fetchDocument();
    this.$document.setState(document);
  }

  async fetchDocument() {
    const { documentId } = this.state;

    if (documentId === 'empty')
      return {
        title: '',
        content: '',
      };
    const document = await getDocument(documentId);
    return document;
  }
}
