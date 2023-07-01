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

    const documentList = await getDocumentList();
    this.$sidebar.setState({ documentList });

    const { documentId } = this.state;
    if (documentId === null) {
      this.$document.setState({ isVisible: false });
      return;
    }

    const document = await getDocument(documentId);
    this.$document.setState({ ...document, isVisible: true });
  }
}
