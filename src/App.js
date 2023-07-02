import Pathname from '@utils/pathname';
import { initRouter } from '@utils/router';

import Component from '@core/Component';

import NotionPage from '@pages/NotionPage';

import './App.css';

export default class App extends Component {
  constructor($target, props) {
    super($target, props);

    initRouter(this.route.bind(this));
    this.route();
  }

  template() {
    return `
      <div class="notion-page"></div>
    `;
  }

  mount() {
    const { documentId } = this;
    const $notionPage = this.$target.querySelector('.notion-page');
    this.$notionPage = new NotionPage($notionPage, { documentId });
  }

  get documentId() {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split('/');
    return documentId ?? null;
  }

  route() {
    const { pathname } = window.location;

    if (Pathname.isRoot(pathname)) {
      return this.setState();
    }

    if (Pathname.isDocument(pathname)) {
      return this.setState();
    }

    return null;
  }
}
