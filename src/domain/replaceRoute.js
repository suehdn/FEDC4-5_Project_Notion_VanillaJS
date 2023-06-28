import { RouteService } from './RouteService';

export function replaceRoute(url) {
  const routeService = new RouteService();
  history.replaceState(null, null, url);
  routeService.route();
}
