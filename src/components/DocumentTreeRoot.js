import { getDocuments, getDocument } from '../api';
import { pushRoute } from '../domain/pushRoute';
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

      if (toggleBtn.textContent === '-') {
        toggleBtn.textContent = '+';
      } else {
        toggleBtn.textContent = '-';
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
  };

  this.render = async () => {
    const documents = await getDocuments();
    new DocumentTree({
      targetElement: targetElement,
      childDocuments: documents,
    });
  };

  this.init();
}
