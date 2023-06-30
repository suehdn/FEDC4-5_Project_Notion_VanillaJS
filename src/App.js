import { RouteService } from './domain/RouteService';

export default function App({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.routeService = new RouteService();
    this.routeService.route();
  };

  this.init();
}
