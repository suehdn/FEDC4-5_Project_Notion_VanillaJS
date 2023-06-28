import DocumentTreeRoot from '../components/DocumentTreeRoot';
import Document from '../components/Document';

export function route() {
  const { pathname } = window.location;
  const appElement = document.querySelector('#app');

  if (pathname === '/') {
    const appElement = document.querySelector('#app');
    Array.from(appElement.children).forEach((element) => {
      if (element.classList.contains('selected-document')) {
        appElement.removeChild(element);
      }
    });
  } else if (pathname.indexOf('/documents') === 0) {
    const documentId = Number(pathname.split('/')[2]);
    const appElement = document.querySelector('#app');
    Array.from(appElement.children).forEach((element) => {
      if (element.classList.contains('selected-document')) {
        appElement.removeChild(element);
      }
    });

    const selectedDocumentElement = document.createElement('div');
    selectedDocumentElement.classList.add('selected-document');

    appElement.appendChild(selectedDocumentElement);

    new Document({ targetElement: selectedDocumentElement, documentId });
  } else {
    appElement.textContent = '404 not found';
  }
}
