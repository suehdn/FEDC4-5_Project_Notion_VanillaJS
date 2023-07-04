import DocumentPage from './DocumentPage.js';
import DocumentEditPage from './DocumentEditPage.js';
import { initRouter } from '../utils/router.js';

export default function App({ $target }) {
  const documentPage = new DocumentPage({
    $target,
  });

  const documentEditPage = new DocumentEditPage({
    $target,
    initialState: {
      documentId: 'new',
      documents: {
        title: '',
        content: '',
      },
    },
  });

  this.route = () => {
    $target.innerHTML = '';
    const { pathname } = window.location;

    if (pathname === '/') {
      documentPage.setState();
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState({ documentId });
    }
  };

  this.route();

  initRouter(() => {
    this.route();
  });
}
