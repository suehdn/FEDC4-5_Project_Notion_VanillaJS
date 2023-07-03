import { navigate } from '../utils/navigate.js';
import { addDocument, removeDocument } from '../apis/api.js';
import { findDocumentRoute } from '../helpers/documentHelper.js';
import Sidebar from '../components/Sidebar/Sidebar.js';
import Navbar from '../components/Navbar/Navbar.js';
import DocumentEditor from '../components/Editor/DocumentEditor.js';
import html from './DocumentPage.html';

export default class DocumentPage {
  constructor({ $target, editorStore, documentStore }) {
    this.$target = $target;
    this.$target.innerHTML = html;

    this.editorStore = editorStore;
    this.documentStore = documentStore;

    this.initComponents();
    this.render();
  }

  initComponents() {
    const { $target, documentStore, editorStore } = this;

    this.sidebar = new Sidebar({
      $target: $target.querySelector('.sidebar'),
      initialState: {
        currentDocumentId: editorStore.state.documentId,
        documents: documentStore.state.documents,
      },
      onAppend: async (id) => {
        this.documentStore.setOpened(id, true);

        const newDocument = await addDocument('', id);
        await documentStore.fetchDocuments();

        navigate(`/documents/${newDocument.id}`);
        this.render();
      },
      onRemove: async (id) => {
        await removeDocument(id);
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

        editorStore.setState({ ...editorStore.state, document: newDocument });
        editorStore.saveDocument();
        documentStore.updateDocument(editorStore.state.documentId, newDocument);

        this.renderSidebar();
        this.renderNavbar();
      },
    });
  }

  renderEditor() {
    const { documentEditor, editorStore } = this;

    documentEditor.setState({
      documentId: editorStore.state.documentId,
      document: editorStore.state.document,
    });
  }

  renderSidebar() {
    const { sidebar } = this;
    const { documentStore, editorStore } = this;

    sidebar.setState({
      documents: documentStore.state.documents,
      openedDocuments: documentStore.state.openedDocuments,
      currentDocumentId: editorStore.state.documentId,
    });
  }

  renderNavbar() {
    const { navbar } = this;
    const { editorStore, documentStore } = this;

    navbar.setState({ routes: findDocumentRoute(editorStore.state.documentId, documentStore.state.documents) });
  }

  render() {
    this.renderEditor();
    this.renderSidebar();
    this.renderNavbar();
  }
}
