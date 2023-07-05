import { RouteService } from './utils/RouteService';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

export default function App({ targetElement }) {
  const homePage = new HomePage({ targetElement });
  const editPage = new EditPage({ targetElement });
  const notFoundPage = new NotFoundPage({ targetElement });
  const router = new RouteService();
  router
    .addRoute({
      match: (pathname) => pathname === '/',
      page: () => homePage.render(),
    })
    .addRoute({
      match: (pathname) => pathname.indexOf('/documents') === 0,
      page: () => editPage.render(),
    })
    .addRoute({
      match: () => true,
      page: () => notFoundPage.render(),
    })
    .start();
}
