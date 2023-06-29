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
    const { $target, documentStore, editorStore } = this;
    await documentStore.fetchDocuments();

    this.sidebar = new Sidebar({
      $target: $target.querySelector('.sidebar'),
      initialState: documentStore.state,
      onAppend: async (id) => {
        await documentStore.addDocument('새로운 문서', id);
        await documentStore.fetchDocuments();
        this.render();
      },
      onRemove: async (id) => {
        await documentStore.removeDocument(id);
        await documentStore.fetchDocuments();
        this.render();
      },
      onNavigate: (id) => navigate(`/documents/${id}`),
    });

    this.documentEditor = new DocumentEditor({
      $target: $target.querySelector('.editor'),
      initialState: editorStore.state.document,
      onChange: ({ name, value }) => {
        editorStore.setDocument({
          ...editorStore.state.document,
          [name]: value,
        });
      },
    });

    if (editorStore.state.documentId === 0) this.documentEditor.setHidden(true);
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
