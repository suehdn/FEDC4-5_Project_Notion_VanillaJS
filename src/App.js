import { postDocument } from './api';
import Button from './components/Button';
import DocumentTreeRoot from './components/DocumentTreeRoot';
import Document from './components/Document';
import { RouteService } from './utils/RouteService';

export default function App({ targetElement }) {
  this.init = () => {
    const router = new RouteService();
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
    router
      .addRoute({
        match: (pathname) => pathname === '/',
        page: () => {
          this.documentTreeRoot.render();
          this.selectedDocument.setState({ ...this.selectedDocument.state, documentId: null });
        },
      })
      .addRoute({
        match: (pathname) => pathname.indexOf('/documents') === 0,
        page: () => {
          this.documentTreeRoot.render();
          const documentId = Number(window.location.pathname.split('/')[2]);
          this.selectedDocument.setState({ ...this.selectedDocument.state, documentId });
        },
      })
      .start();
  };

  this.setEvent = () => {
    window.addEventListener('editTitle', (e) => {
      const { documentId, title } = e.detail;
      const documentTreeElement = document.querySelector(`.document-tree[data-id="${documentId}"]`);
      const documentTitleElement = documentTreeElement.querySelector('.document-blob-title');
      documentTitleElement.textContent = title;
    });
    window.addEventListener('asyncEditTitle', () => this.documentTreeRoot.render());
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="side-bar">
        <div class="document-tree-root"></div>
        <button class="new-root-document-btn"></button>
      </div>
      <div class="selected-document"></div>
    `;
    const [sideBarElement, selectedDocumentElement] = targetElement.children;
    const [documentTreeRootElement, newRootDocumentBtn] = sideBarElement.children;

    this.documentTreeRoot = new DocumentTreeRoot({ targetElement: documentTreeRootElement });
    this.selectedDocument = new Document({ targetElement: selectedDocumentElement });
    this.newRootDocumentBtn = new Button({
      targetElement: newRootDocumentBtn,
      textContent: '새 문서',
      onClick: async () => {
        const router = new RouteService();
        const { id } = await postDocument({ title: '', parent: null });
        this.documentTreeRoot.render();
        router.push(`/documents/${id}`);
      },
    });
  };

  this.init();
}
