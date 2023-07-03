import { getDocuments } from '../api';
import Button from '../components/Button';
import DocumentTreeRoot from '../components/DocumentTreeRoot';

export default function HomePage({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = async () => {
    const documents = await getDocuments();
    targetElement.innerHTML = `
      <div class="side-bar">
        <div class="document-tree-root"></div>
        <button class="new-root-document-btn"></button>
      </div>
    `;
    const [sideBarElement] = targetElement.children;
    const [documentTreeRootElement, newRootDocumentBtn] = sideBarElement.children;

    new DocumentTreeRoot({ targetElement: documentTreeRootElement, documents });
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
