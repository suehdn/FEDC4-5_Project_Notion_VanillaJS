import { getDocuments, getDocument, postDocument, deleteDocument } from '../api';
import { pushRoute } from '../domain/pushRoute';
import { replaceRoute } from '../domain/replaceRoute';
import DocumentTree from './DocumentTree';

export default function DocumentTreeRoot({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.setEvent = () => {
    targetElement.addEventListener('click', (e) => {
      if (!e.target.closest('.document-toggle')) return;

      const toggleBtn = e.target;
      const treeElement = e.target.parentNode.parentNode;

      if (toggleBtn.textContent === 'v') {
        toggleBtn.textContent = '>';
      } else {
        toggleBtn.textContent = 'v';
      }

      Array.from(treeElement.children).forEach((node) => {
        if (node.classList.contains('document-blob')) return;
        if (node.style.display === 'none') {
          node.style.display = 'block';
        } else {
          node.style.display = 'none';
        }
      });
    });

    targetElement.addEventListener('click', (e) => {
      if (!e.target.classList.contains('document-blob')) return;
      const documentId = e.target.parentNode.dataset.id;
      pushRoute(`/documents/${documentId}`);
    });

    targetElement.addEventListener('click', async (e) => {
      if (!e.target.closest('.new-document-btn')) return;
      const documentTree = e.target.parentNode.parentNode;
      const newDocument = await postDocument({ title: '', parent: documentTree.dataset.id });
      new DocumentTree({
        targetElement: documentTree,
        childDocuments: [{ ...newDocument, documents: [] }],
      });
      pushRoute(`/documents/${newDocument.id}`);
    });

    targetElement.addEventListener('click', async (e) => {
      if (!e.target.closest('.delete-document-btn')) return;
      const { pathname } = window.location;
      const documentIdParam = Number(pathname.split('/')[2]);
      const documentTree = e.target.parentNode.parentNode;
      await deleteDocument(documentTree.dataset.id);
      if (documentIdParam === Number(documentTree.dataset.id)) {
        replaceRoute('/');
      } else {
        replaceRoute(`/documents/${documentIdParam}`);
      }
    });
  };

  this.render = async () => {
    const documents = await getDocuments();
    targetElement.innerHTML = '';
    new DocumentTree({
      targetElement,
      childDocuments: documents,
    });
  };

  this.init();
}
