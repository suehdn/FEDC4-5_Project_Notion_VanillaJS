import DocumentTreeRoot from './components/DocumentTreeRoot';
import { route } from './domain/route';

export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
    route();
  };

  this.setEvent = () => {
    window.addEventListener('popstate', route);
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="document-tree-root"></div>
    `;
    const [documentTreeRootElement] = targetElement.children;
    new DocumentTreeRoot({ targetElement: documentTreeRootElement });
  };

  this.init();
}
