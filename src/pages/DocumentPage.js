import { addDocument, modifyDocument, deleteDocument } from '../apis/api.js';
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
    });

    // this.apiTest();
  }

  render() {
    //TODO: DocumentTitle, DocumentContent, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
    const { documentContent, documentStore } = this;

    documentContent.setState(documentStore.state.content);
  }

  apiTest() {
    let testButton = document.createElement('button');
    testButton.innerText = '추가';
    testButton.addEventListener('click', () => {
      let temp = 69786;
      addDocument('세 번째 깊이1', temp);
      addDocument('세 번째 깊이2', temp);
      addDocument('세 번째 깊이3', temp);
    });
    this.$target.appendChild(testButton);

    testButton = document.createElement('button');
    testButton.innerText = '수정';
    testButton.addEventListener('click', () => {
      modifyDocument({ title: '수정완료', content: '내용입니다' }, 69767);
    });
    this.$target.appendChild(testButton);

    testButton = document.createElement('button');
    testButton.innerText = '삭제';
    testButton.addEventListener('click', () => {
      deleteDocument(69783);
      deleteDocument(69784);
      deleteDocument(69785);
    });
    this.$target.appendChild(testButton);
  }
}
