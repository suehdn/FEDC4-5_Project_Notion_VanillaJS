import DocumentPage from '../pages/DocumentPage.js';
import { getDocuments } from '../apis/api.js';

export default class App {
  constructor({ $target }) {
    new DocumentPage({ $target });
  }
}

getDocuments().then(console.log);