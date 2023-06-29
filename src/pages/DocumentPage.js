import { addDocument, modifyDocument, removeDocument } from '../apis/api.js';
import { DOCUMENT } from '../constants/storageKeys.js';
import { navigate } from '../utils/navigate.js';
import storage from '../utils/storage.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import DocumentEditor from '../components/Editor/DocumentEditor.js';
import EditorStore from '../stores/editorStore.js';
import DocumentStore from '../stores/documentStore.js';
import html from './DocumentPage.html';
import './DocumentPage.css';

export default class DocumentPage {
  constructor({ $target, initialState }) {
    this.$target = $target;
    this.$target.innerHTML = html;
    this.state = initialState;

    this.editorStore = new EditorStore({
      initialState: {
        documentId: this.state.documentId,
        document: storage.getItem(DOCUMENT(this.state.documentId), {
          title: '',
          content: '',
        }),
      },
    });

    this.documentStore = new DocumentStore();
    this.initComponents();
  }

  async setState(nextState) {
    if (this.state.documentId !== nextState.documentId) await this.documentStore.fetchDocuments();

    this.state = nextState;
    this.editorStore.setDocumentId(nextState.documentId);
    this.editorStore.setDocument(
      storage.getItem(DOCUMENT(nextState.documentId), {
        title: '',
        content: '',
      })
    );

    this.render();
  }

  async initComponents() {
    await this.documentStore.fetchDocuments();

    this.sidebar = new Sidebar({
      $target: this.$target.querySelector('.sidebar'),
      initialState: this.documentStore.state,
      onAppend: async (id) => {
        await this.documentStore.addDocument('새로운 문서', id);
        await this.documentStore.fetchDocuments();
        this.render();
      },
      onRemove: async (id) => {
        await this.documentStore.removeDocument(id);
        await this.documentStore.fetchDocuments();
        this.render();
      },
      onNavigate: (id) => navigate(`/documents/${id}`),
    });

    this.documentEditor = new DocumentEditor({
      $target: this.$target.querySelector('.editor'),
      initialState: this.editorStore.state.document,
      onChange: ({ name, value }) => {
        this.editorStore.setDocument({
          ...this.editorStore.state.document,
          [name]: value,
        });
      },
    });
  }

  render() {
    //TODO: DocumentEditor, Sidebar의 내용을 새롭게 렌더링하는 코드가 들어가야 합니다.
    const { documentEditor, editorStore, sidebar, documentStore } = this;

    documentEditor.setState(editorStore.state.document);
    sidebar.setState(documentStore.state);

    if (editorStore.state.documentId === 0) documentEditor.setHidden(true);
    else documentEditor.setHidden(false);
  }
}
