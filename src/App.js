import Pathname from '@utils/pathname';
import { initRouter } from '@utils/router';

import NotionPage from '@pages/NotionPage';

import './App.css';

export default class App {
  constructor({ $target }) {
    this.$notionPage = new NotionPage({ $target });

    initRouter(this.route.bind(this));
    this.route();
  }

  route() {
    const { pathname } = window.location;

    if (Pathname.isRoot(pathname)) {
      return this.$notionPage.setState({ documentId: 'empty' });
    }

    if (Pathname.isDocument(pathname)) {
      const [, , documentId] = pathname.split('/');
      return this.$notionPage.setState({ documentId });
    }

    return null;
  }
}
