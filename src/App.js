import DocumentEditPage from './pages/mainPage/DocumentEditPage';
import HomePage from './pages/mainPage/HomePage';
import SidebarDocumentPage from './pages/sidebarPage/SidebarDocumentPage';
import { initRouter } from './domain/router';

export default function App({ $target }) {
  // 페이지 및 컴포넌트 초기화
  const $documentSidebarArea = document.createElement('div');
  $documentSidebarArea.classList.add('document-sidebar__area');
  $target.appendChild($documentSidebarArea);

  const $documentEditArea = document.createElement('div');
  $documentEditArea.classList.add('document-edit__area');
  $target.appendChild($documentEditArea);

  const sidebarDocumentPage = new SidebarDocumentPage({
    $target: $documentSidebarArea,
  });

  const homePage = new HomePage({
    $target: $documentEditArea,
  });

  const documentEditPage = new DocumentEditPage({
    $target: $documentEditArea,
    initialState: {
      documentId: 'new',
      documents: {
        title: '',
        content: '',
      },
    },
    renderDocumentTree: () => {
      sidebarDocumentPage.render();
    },
  });

  // 현재 URL 경로를 기반으로 페이지를 렌더링
  this.route = () => {
    $documentEditArea.innerHTML = '';
    const { pathname } = window.location;
    if (pathname.indexOf('/documents/') === 0) {
      const [, , documentId] = pathname.split('/');
      documentEditPage.setState({ documentId });
    } else {
      sidebarDocumentPage.render();
      homePage.render();
    }
  };

  // 브라우저의 뒤로 가기 버튼 등에 의한 URL 변경을 감지
  window.addEventListener('popstate', () => this.route());

  this.route();
  initRouter(() => this.route());
}
