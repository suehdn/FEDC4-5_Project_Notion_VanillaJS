import { route } from './domain/route';

export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    route();
  };

  this.setEvent = () => {
    window.addEventListener('popstate', route);
  };

  this.init();
}
