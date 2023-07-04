import { postDocument } from '../api';
import Button from '../components/Button';
import DocumentTreeRoot from '../components/DocumentTreeRoot';
import { RouteService } from '../utils/RouteService';
import validateComponent from '../utils/validateComponent';

export default function SideBar({ targetElement, documents }) {
  validateComponent(this, SideBar);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.state = {
    documents,
  };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="side-bar-header">📘 ${import.meta.env.VITE_X_USERNAME}의 Notion</div>
      <div class="document-tree-root"></div>
      <button class="new-root-document-btn"></button>
    `;
    const [_, documentTreeRootElement, newRootDocumentBtnElement] = targetElement.children;

    this.documentTreeRoot = new DocumentTreeRoot({
      targetElement: documentTreeRootElement,
      documents: this.state.documents,
    });
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
