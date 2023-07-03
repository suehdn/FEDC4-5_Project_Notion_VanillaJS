import { getDocument, getDocuments } from '../api';
import Button from '../components/Button';
import DocumentTreeRoot from '../components/DocumentTreeRoot';
import Document from '../components/Document';

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
    window.addEventListener('asyncEditTitle', async () => {
      const documents = await getDocuments();
      const [sideBarElement] = targetElement.children;
      const [documentTreeRootElement] = sideBarElement.children;
      this.documentTreeRoot = new DocumentTreeRoot({ targetElement: documentTreeRootElement, documents });
    });
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
    const [documentTreeRootElement, newRootDocumentBtn] = sideBarElement.children;

    new DocumentTreeRoot({ targetElement: documentTreeRootElement, documents });
    new Document({ targetElement: selectedDocumentElement, documentData });
    new Button({
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
