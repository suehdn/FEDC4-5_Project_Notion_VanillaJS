import './NotionPage.css';

import NotionSidebar from '@components/NotionSidebar';
import request from '@utils/api';

export default class NotionPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = document.createElement('div');
    this.$page.className = 'notion-page';

    this.$sidebar = new NotionSidebar({ $target: this.$page });

    this.setState();
  }

  async setState() {
    const documents = await request('/documents');
    this.$sidebar.setState(documents);
    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }
}
