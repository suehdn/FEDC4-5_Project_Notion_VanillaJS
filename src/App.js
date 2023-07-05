import { RouteService } from './utils/RouteService';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import { setItem } from './utils/storage';
import { localStorageKeys } from './constants/localStorageKeys';

export default function App({ targetElement }) {
  setItem(localStorageKeys.DOCUMENTS_STALE_TIME, 0);
  const router = new RouteService();
  router
    .addRoute({
      match: (pathname) => pathname === '/',
      page: () => new HomePage({ targetElement }),
    })
    .addRoute({
      match: (pathname) => pathname.indexOf('/documents') === 0,
      page: () => new EditPage({ targetElement }),
    })
    .addRoute({
      match: () => true,
      page: () => new NotFoundPage({ targetElement }),
    })
    .start();
}
