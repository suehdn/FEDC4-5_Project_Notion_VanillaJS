import { route } from './route';

export function replaceRoute(url) {
  history.replaceState(null, null, url);
  route();
}
