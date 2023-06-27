import DocumentContent from '../components/Document/DocumentContent.js';
import DocumentStore from '../stores/documentStore.js';
import html from './DocumentPage.html';

export default class DocumentPage {
  constructor({ $target, initialState }) {
    this.$wrapper = document.createElement('main');
    this.$wrapper.className = 'document-page';
    this.$wrapper.innerHTML = html;
    $target.appendChild(this.$wrapper);

    this.documentStore = new DocumentStore();

    this.initComponents();
  }

  initComponents() {
    this.documentContent = new DocumentContent({
      $target: this.$wrapper.querySelector('.document-content'),
      onChange: (value) => {
        this.documentStore.setContent(value);
        this.render();
      },
    });
  }

  render() {
    //TODO: DocumentTitle, DocumentContent, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
    const { documentContent, documentStore } = this;

    documentContent.setState(documentStore.state.content);
  }
}
