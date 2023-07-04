import { getDocuments, postDocument } from '../api';
import Button from '../components/Button';
import DocumentTreeRoot from '../components/DocumentTreeRoot';
import { RouteService } from '../utils/RouteService';

export default function SideBar({ targetElement, documents }) {
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
      this.documentTreeRoot.setState({ ...this.documentTreeRoot.state, documents: await getDocuments() });
    });
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="document-tree-root"></div>
      <button class="new-root-document-btn"></button>
    `;
    const [documentTreeRootElement, newRootDocumentBtnElement] = targetElement.children;

    this.documentTreeRoot = new DocumentTreeRoot({ targetElement: documentTreeRootElement, documents });
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
