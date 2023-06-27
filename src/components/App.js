import DocumentPage from '../pages/DocumentPage.js';

export default class App {
  constructor({ $target }) {
    new DocumentPage({ $target });
  }
}
