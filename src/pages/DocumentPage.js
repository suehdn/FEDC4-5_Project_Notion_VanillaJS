import DocumentContent from '../components/Document/DocumentContent.js';
import html from './DocumentPage.html';

export default class DocumentPage {
  constructor({ $target, initialState }) {
    this.$wrapper = document.createElement('main');
    this.$wrapper.className = 'document-page';
    this.$wrapper.innerHTML = html;
    $target.appendChild(this.$wrapper);

    this.initComponents();
  }

  initComponents() {
    new DocumentContent({
      $target: this.$wrapper.querySelector('.document-content'),
    });
  }

  render() {
    //TODO: DocumentTitle, DocumentContent, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
  }
}
