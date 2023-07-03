import { OPENED_DOCUMENTS } from '../constants/storageKeys.js';
import { navigate } from '../utils/navigate.js';
import { addDocument, removeDocument } from '../apis/api.js';
import { findDocumentRoute } from '../helpers/documentHelper.js';
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

    this.initialize();
    // this.fetchData();
    // this.initComponents();
    // this.render();
  }

  async initialize() {
    this.fetchData();
    this.initComponents();
    // this.render();
  }

  async setState(nextState) {
    const { editorStore, documentStore } = this;
    editorStore.setState({ ...editorStore.state, documentId: nextState.documentId });

    // if (documentStore.state.documents.length === 0) await documentStore.fetchDocuments();
    // if (this.state.documentId !== nextState.documentId) {
    //   const { documentId, document, isLocalData } = await editorStore.fetchDocument(nextState.documentId);

    //   // if (isLocalData) {
    //   //   documentStore.updateDocument(documentId, document);
    //   //   editorStore.saveDocument(() => {
    //   //     // this.render();
    //   //   }, 0);
    //   // }
    // }

    this.state = nextState;
    await editorStore.fetchDocument(this.state.documentId);
    this.render();
  }

  async fetchData() {
    const { editorStore, documentStore } = this;

    if (documentStore.state.documents.length === 0) await documentStore.fetchDocuments();
    if (this.state.documentId !== 0) await editorStore.fetchDocument(this.state.documentId);

    (await editorStore.pushStorageDocuments(documentStore.state.documents)).forEach(({ documentId, document }) => {
      // TODO: 문서 목록에서 해당 문서를 찾아서 업데이트하기.
      documentStore.updateDocument(documentId, document);
    });

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

    navbar.setState({ routes: findDocumentRoute(editorStore.state.documentId, documentStore.state.documents) });
  }

  render() {
    this.renderEditor();
    this.renderSidebar();
    this.renderNavbar();
  }
}
