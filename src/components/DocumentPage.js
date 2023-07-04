import { request } from '../apis/api.js';
import LinkButton from './LinkButton.js';
import DocumentList from './DocumentList.js';

export default function DocumentPage({ $target }) {
  const $page = document.createElement('div');

  new LinkButton({
    $target: $page,
    initialState: {
      text: 'New Document',
      link: '/documents/new',
    },
  });

  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
  });

  this.setState = async () => {
    const documents = await request('/documents');
    documentList.setState(documents);

    this.render();
  };

  this.render = async () => {
    $target.appendChild($page);
  };
}
