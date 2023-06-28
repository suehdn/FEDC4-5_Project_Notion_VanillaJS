import { RouteService } from './RouteService';

export function pushRoute(url) {
  const routeService = new RouteService();
  history.pushState(null, null, url);
  routeService.route();
}
