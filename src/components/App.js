import DocumentPage from '../pages/DocumentPage.js';
import { NAVIGATE_EVENT_KEY } from '../utils/navigate.js';

export default class App {
  constructor({ $target }) {
    this.documentPage = new DocumentPage({
      $target,
      initialState: {
        documentId: 0,
      },
    });
    this.$target = $target;

    this.initEvents();
    this.route();
  }

  initEvents() {
    window.addEventListener(NAVIGATE_EVENT_KEY, (e) => {
      const { nextUrl } = e.detail;
      if (!nextUrl) return;

      if (window.location.pathname === nextUrl) history.replaceState(null, null, nextUrl);
      else history.pushState(null, null, nextUrl);
      this.route();
    });

    window.addEventListener('popstate', (e) => {
      this.route();
    })
  }

  route() {
    const { pathname } = window.location;

    if (pathname === '/') {
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      if (isNaN(documentId) || Number(documentId) === 0) return;

      this.documentPage.setState({ documentId: Number(documentId) });
    }
  }
}
