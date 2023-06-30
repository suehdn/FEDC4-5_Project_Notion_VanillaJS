import Document from '../components/Document';
import DocumentTreeRoot from '../components/DocumentTreeRoot';

export class RouteService {
  constructor() {
    if (!RouteService.instance) {
      this.#setEvent();
      this.appElement = document.querySelector('#app');
      this.appElement.innerHTML = `
        <div class="side-bar">
          <div class="document-tree-root"></div>
          <button class="new-root-document-btn">새 문서</button>
        </div>
        <div class="selected-document"></div>
      `;
      const [sideBarElement, selectedDocumentElement] = this.appElement.children;
      const [documentTreeRootElement] = sideBarElement.children;
      this.documentTreeRoot = new DocumentTreeRoot({ targetElement: documentTreeRootElement });
      this.selectedDocument = new Document({ targetElement: selectedDocumentElement });
      RouteService.instance = this;
      this.#route();
    }

    return RouteService.instance;
  }

  #setEvent() {
    window.addEventListener('popstate', () => this.#route());
    window.addEventListener('editTitle', (e) => {
      const { documentId, title } = e.detail;
      const documentTreeElement = document.querySelector(`.document-tree[data-id="${documentId}"]`);
      const documentTitleElement = documentTreeElement.querySelector('.document-blob-title');
      documentTitleElement.textContent = title;
    });
    window.addEventListener('asyncEditTitle', () => this.documentTreeRoot.render());
  }

  #route() {
    const { pathname } = window.location;
    const appElement = document.querySelector('#app');

    if (pathname === '/') {
      this.documentTreeRoot.render();
      this.selectedDocument.setState({ ...this.selectedDocument.state, documentId: null });
    } else if (pathname.indexOf('/documents') === 0) {
      const documentId = Number(pathname.split('/')[2]);
      this.documentTreeRoot.render();
      this.selectedDocument.setState({ ...this.selectedDocument.state, documentId });
    } else {
      appElement.textContent = '404 not found';
    }
  }

  push(url) {
    history.pushState(null, null, url);
    this.#route();
  }

  replace(url) {
    history.replaceState(null, null, url);
    this.#route();
  }
}
