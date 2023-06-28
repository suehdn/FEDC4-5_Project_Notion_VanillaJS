import Sidebar from '../components/Sidebar/Sidebar.js';
import DocumentContent from '../components/Document/DocumentContent.js';
import DocumentStore from '../stores/documentStore.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

export default class DocumentPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$target.innerHTML = html;

    this.documentStore = new DocumentStore();
    this.initComponents();
  }

  initComponents() {
    this.documentContent = new DocumentContent({
      $target: this.$target.querySelector('.document-content'),
      onChange: (value) => {
        this.documentStore.setContent(value);
        this.render();
      },
    });

    this.sideBar = new Sidebar({
      $target: this.$target.querySelector('.sidebar'),
    })
  }

  render() {
    //TODO: DocumentTitle, DocumentContent, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
    const { documentContent, documentStore } = this;

    documentContent.setState(documentStore.state.content);
  }
}
