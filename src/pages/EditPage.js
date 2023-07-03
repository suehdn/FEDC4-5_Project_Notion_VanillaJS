import { getDocument, getDocuments, postDocument } from '../api';
import Button from '../components/Button';
import DocumentTreeRoot from '../components/DocumentTreeRoot';
import Document from '../components/Document';
import { RouteService } from '../utils/RouteService';

export default function EditPage({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    window.addEventListener('editTitle', (e) => {
      const { documentId, title } = e.detail;
      const documentTreeElement = document.querySelector(`.document-tree[data-id="${documentId}"]`);
      const documentTitleElement = documentTreeElement.querySelector('.document-blob-title');
      documentTitleElement.textContent = title;
    });
    window.addEventListener('asyncEditTitle', () => this.render());
  };

  this.render = async () => {
    const documentId = window.location.pathname.split('/')[2];
    const [documents, documentData] = await Promise.all([getDocuments(), getDocument(documentId)]);
    if (!documents || !documentData) return;

    targetElement.innerHTML = `
      <div class="side-bar">
        <div class="document-tree-root"></div>
        <button class="new-root-document-btn"></button>
      </div>
      <div class="selected-document"></div>
    `;
    const [sideBarElement, selectedDocumentElement] = targetElement.children;
    const [documentTreeRootElement, newRootDocumentBtnElement] = sideBarElement.children;

    this.documentTreeRoot = new DocumentTreeRoot({ targetElement: documentTreeRootElement, documents });
    this.selectedDocument = new Document({ targetElement: selectedDocumentElement, documentData });
    this.newRootDocumentBtn = new Button({
      targetElement: newRootDocumentBtnElement,
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
