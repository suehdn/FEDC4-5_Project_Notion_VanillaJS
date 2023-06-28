import { route } from './route';

export function pushRoute(url) {
  history.pushState(null, null, url);
  route();
}
