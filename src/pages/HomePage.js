import SideBar from '../components/SideBar';
import { proxiedDocuments } from '../domain/proxiedDocuments';
import validateComponent from '../utils/validateComponent';

export default function HomePage({ targetElement }) {
  validateComponent(this, HomePage);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = async () => {
    const documents = await proxiedDocuments.documents;
    targetElement.innerHTML = `
      <div class="side-bar"></div>
    `;
    const [sideBarElement] = targetElement.children;
    this.sideBar = new SideBar({ targetElement: sideBarElement, documents });
  };

  this.init();
}
