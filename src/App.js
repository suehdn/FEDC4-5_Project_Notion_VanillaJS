import { RouteService } from './domain/RouteService';

export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.routeService = new RouteService();
    this.setEvent();
    this.routeService.route();
  };

  this.setEvent = () => {
    window.addEventListener('popstate', () => this.routeService.route());
  };

  this.init();
}
