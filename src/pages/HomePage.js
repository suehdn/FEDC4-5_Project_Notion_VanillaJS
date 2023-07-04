import { getDocuments } from '../api';
import SideBar from '../components/SideBar';

export default function HomePage({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = async () => {
    const documents = await getDocuments();
    targetElement.innerHTML = `
      <div class="side-bar"></div>
    `;
    const [sideBarElement] = targetElement.children;
    this.sideBar = new SideBar({ targetElement: sideBarElement, documents });
  };

  this.init();
}
