import request from '@utils/api';

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

    const documents = await request('/documents');
    this.$sidebar.setState(documents);

    const { documentId } = this.state;
    if (documentId !== 'empty') {
      const document = await request(`/documents/${documentId}`);
      this.$document.setState(document);
    }
  }
}
