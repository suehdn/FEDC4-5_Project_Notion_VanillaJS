import { addDocument, modifyDocument, removeDocument } from '../apis/api.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import DocumentContent from '../components/Document/DocumentContent.js';
import EditorStore from '../stores/editorStore.js';
import DocumentStore from '../stores/documentStore.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

export default class DocumentPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$target.innerHTML = html;

    this.editorStore = new EditorStore();
    this.documentStore = new DocumentStore();
    this.initComponents();
  }

  async initComponents() {
    await this.documentStore.fetchDocuments();

    this.sidebar = new Sidebar({
      $target: this.$target.querySelector('.sidebar'),
      initialState: this.documentStore.state,
      onAppend: async (id) => {
        await this.documentStore.addDocument('새로운 문서', id);
        this.render();
      },
      onRemove: async (id) => {
        await this.documentStore.removeDocument(id);
        this.render();
      },
    });

    this.documentContent = new DocumentContent({
      $target: this.$target.querySelector('.document-content'),
      onChange: (value) => {
        this.editorStore.setContent(value);
        this.render();
      },
    });

    // this.apiTest();
  }

  async render() {
    await this.documentStore.fetchDocuments();

    //TODO: DocumentTitle, DocumentContent, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
    const { documentContent, editorStore, sidebar, documentStore } = this;

    documentContent.setState(editorStore.state.content);
    sidebar.setState(documentStore.state);
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
      removeDocument(69783);
      removeDocument(69784);
      removeDocument(69785);
    });
    this.$target.appendChild(testButton);
  }
}
