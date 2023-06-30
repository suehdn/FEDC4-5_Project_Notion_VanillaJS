import { RouteService } from './domain/RouteService';

export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
    this.routeService = new RouteService();
  };

  this.render = () => {
    targetElement.innerHTML = `
      <div class="side-bar">
        <div class="document-tree-root"></div>
        <button class="new-root-document-btn"></button>
      </div>
      <div class="selected-document"></div>
    `;
  };

  this.init();
}
