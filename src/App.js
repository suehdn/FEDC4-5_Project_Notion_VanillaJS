import NotionPage from './pages/NotionPage.js';
import { initRouter } from './utils/router.js';

export default function App({ $target }) {
  const notionPage = new NotionPage({
    $target,
    initialState: {
      documents: [],
      documentId: null,
    },
  });

  this.route = () => {
    const { pathname } = window.location;

    if (pathname === '/') {
      notionPage.setState({
        ...notionPage.state,
        documentId: null,
      });
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      notionPage.setState({
        ...notionPage.state,
        documentId,
      });
    }
  };

  this.route();

  initRouter(() => this.route());
}
