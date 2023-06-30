import NotionPage from '@pages/NotionPage';
import './App.css';

export default class App {
  constructor({ $target }) {
    this.$notionPage = new NotionPage({ $target });
  }
}
