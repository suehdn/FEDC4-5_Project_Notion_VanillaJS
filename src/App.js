import DocumentPage from './pages/DocumentPage.js';
import DocumentStore from './stores/documentStore.js';
import EditorStore from './stores/editorStore.js';
import storage from './utils/storage.js';
import { OPENED_DOCUMENTS } from './constants/storageKeys.js';
import { navigate } from './utils/navigate.js';
import { initialDocument } from './stores/editorStore.js';
import { NAVIGATE_EVENT_KEY } from './utils/navigate.js';

export default class App {
  constructor({ $target }) {
    this.$target = $target;

    this.initStores();
    this.initComponents();
    this.initEvents();
    this.route();
  }

  initStores() {
    this.editorStore = new EditorStore({
      initialState: {
        documentId: 0,
        document: initialDocument,
      },
    });

    this.documentStore = new DocumentStore({
      initialState: {
        openedDocuments: storage.getItem(OPENED_DOCUMENTS, {}),
        documents: [],
      },
    });
  }

  initComponents() {
    this.documentPage = new DocumentPage({
      $target: this.$target,
      documentStore: this.documentStore,
      editorStore: this.editorStore,
    });
  }

  initEvents() {
    window.addEventListener(NAVIGATE_EVENT_KEY, (e) => {
      const { nextUrl } = e.detail;
      if (!nextUrl) return;

      if (window.location.pathname === nextUrl) history.replaceState(null, null, nextUrl);
      else history.pushState(null, null, nextUrl);
      this.route();
    });

    window.addEventListener('popstate', (e) => {
      this.route();
    });

    window.addEventListener('click', (e) => {
      if (e.target.tagName !== 'A') return;
      e.preventDefault();
      navigate(e.target.getAttribute('href'));
    });
  }

  async route() {
    const { pathname } = window.location;
    const { documentStore, editorStore } = this;

    // 사이드바에 문서 목록이 없으면 불러오기
    if (documentStore.state.documents.length === 0) await documentStore.fetchDocuments();

    // 로컬 스토리지에 존재하는 문서가 최신 정보이면 서버에 최신 정보로 반영하기
    (await editorStore.pushStorageDocuments(documentStore.state.documents)).forEach(({ documentId, document }) => {
      documentStore.updateDocument(documentId, document);
    });

    if (pathname === '/') {
    } else if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      if (isNaN(documentId) || Number(documentId) === 0) return;

      // 새로운 문서를 열면 데이터 가져오기
      if (editorStore.state.documentId !== documentId) {
        await editorStore.fetchDocument(documentId);
        editorStore.setState({ ...editorStore.state, documentId: Number(documentId) });
      }
    }
    this.documentPage.render();
  }
}
