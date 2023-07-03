import { OPENED_DOCUMENTS } from '../constants/storageKeys.js';
import { navigate } from '../utils/navigate.js';
import storage from '../utils/storage.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import Navbar from '../components/Navbar/Navbar.js';
import DocumentEditor from '../components/Editor/DocumentEditor.js';
import EditorStore, { initialDocument } from '../stores/editorStore.js';
import DocumentStore from '../stores/documentStore.js';
import html from './DocumentPage.html';

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
    this.render();
  }

  async setState(nextState) {
    this.editorStore.setDocumentId(nextState.documentId);

    if (this.documentStore.state.documents.length === 0) await this.documentStore.fetchDocuments();
    if (this.state.documentId !== nextState.documentId) {
      const { documentId, document, isLocalData } = await this.editorStore.fetchDocument(nextState.documentId);

      if (isLocalData) {
        this.documentStore.updateDocument(documentId, document);
        this.editorStore.saveDocument(0);
      }
    }

    this.state = nextState;
    this.render();
  }

  async initComponents() {
    const { $target, documentStore, editorStore } = this;

    this.sidebar = new Sidebar({
      $target: $target.querySelector('.sidebar'),
      initialState: {
        currentDocumentId: editorStore.state.documentId,
        documents: documentStore.state.documents,
      },
      onAppend: async (id) => {
        this.documentStore.setOpened(id, true);

        const newDocument = await documentStore.addDocument('', id);
        await documentStore.fetchDocuments();

        navigate(`/documents/${newDocument.id}`);
        this.render();
      },
      onRemove: async (id) => {
        await documentStore.removeDocument(id);
        await documentStore.fetchDocuments();
        this.render();
      },
      onNavigate: (id) => navigate(`/documents/${id}`),
      onToggleOpened: (id) => {
        this.documentStore.setOpened(id, !this.documentStore.state.openedDocuments[id]);
        this.render();
      },
    });

    this.navbar = new Navbar({
      $target: $target.querySelector('.main__navbar'),
    });

    this.documentEditor = new DocumentEditor({
      $target: $target.querySelector('.main__editor'),
      initialState: editorStore.state.document,
      onChange: ({ name, value }) => {
        const newDocument = {
          ...editorStore.state.document,
          [name]: value,
          updateAt: new Date(),
        };

        editorStore.setDocument(newDocument);
        editorStore.saveDocument();

        documentStore.updateDocument(editorStore.state.documentId, newDocument);
        this.renderSidebar();
        this.renderNavbar();
      },
    });

    await documentStore.fetchDocuments();
    this.render();
  }

  renderEditor() {
    const { documentEditor } = this;
    const { editorStore } = this;

    documentEditor.setState(editorStore.state);
  }

  renderSidebar() {
    const { sidebar } = this;
    const { editorStore, documentStore } = this;

    sidebar.setState({
      documents: documentStore.state.documents,
      openedDocuments: documentStore.state.openedDocuments,
      currentDocumentId: editorStore.state.documentId,
    });
  }

  renderNavbar() {
    const { navbar } = this;
    const { editorStore, documentStore } = this;

    navbar.setState({ routes: documentStore.findDocumentRoute(editorStore.state.documentId) });
  }

  render() {
    this.renderEditor();
    this.renderSidebar();
    this.renderNavbar();
  }
}
