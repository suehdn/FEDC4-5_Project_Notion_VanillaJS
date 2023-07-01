import { DOCUMENT, OPENED_DOCUMENTS } from '../constants/storageKeys.js';
import { navigate } from '../utils/navigate.js';
import storage from '../utils/storage.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import DocumentEditor from '../components/Editor/DocumentEditor.js';
import EditorStore, { initialDocument } from '../stores/editorStore.js';
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
        document: initialDocument,
      },
    });

    this.documentStore = new DocumentStore({
      initialState: {
        openedDocuments: storage.getItem(OPENED_DOCUMENTS, {}),
        documents: [],
      },
    });

    this.initComponents();
  }

  async setState(nextState) {
    if (this.state.documentId !== nextState.documentId) await this.documentStore.fetchDocuments();

    this.state = nextState;
    this.editorStore.setDocumentId(nextState.documentId);
    await this.editorStore.fetchDocument(nextState.documentId);

    this.render();
  }

  async initComponents() {
    const { $target, documentStore, editorStore } = this;
    await documentStore.fetchDocuments();

    this.sidebar = new Sidebar({
      $target: $target.querySelector('.sidebar'),
      initialState: {
        currentDocumentId: editorStore.state.documentId,
        documents: documentStore.state.documents,
      },
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
      onToggleOpened: (id) => {
        this.documentStore.toggleOpened(id);
        this.render();
      },
    });

    this.documentEditor = new DocumentEditor({
      $target: $target.querySelector('.main__editor'),
      initialState: editorStore.state.document,
      onChange: ({ name, value }) => {
        editorStore.setDocument({
          ...editorStore.state.document,
          updateAt: new Date(),
          [name]: value,
        });
        editorStore.saveDocument();
      },
    });

    if (editorStore.state.documentId === 0) this.documentEditor.setHidden(true);
  }

  render() {
    const { documentEditor, editorStore, sidebar, documentStore } = this;

    documentEditor.setState(editorStore.state.document);
    sidebar.setState({
      documents: documentStore.state.documents,
      openedDocuments: documentStore.state.openedDocuments,
      currentDocumentId: editorStore.state.documentId,
    });

    if (editorStore.state.documentId === 0) documentEditor.setHidden(true);
    else documentEditor.setHidden(false);
  }
}
