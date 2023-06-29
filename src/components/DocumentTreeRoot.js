import { getDocuments, postDocument, deleteDocument } from '../api';
import { pushRoute } from '../domain/pushRoute';
import { replaceRoute } from '../domain/replaceRoute';
import DocumentTree from './DocumentTree';

export default function DocumentTreeRoot({ targetElement }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.state = {
    invisibleTreeSet: new Set(),
    foldedTreeSet: new Set(),
  };

  this.setState = (nextState) => {
    this.state = { ...nextState };
    this.render();
  };

  this.setEvent = () => {
    // 토글버튼 클릭 이벤트리스너
    targetElement.addEventListener('click', (e) => {
      if (!e.target.closest('.document-toggle')) return;

      const treeElement = e.target.parentNode.parentNode;
      const foldedTreeId = Number(treeElement.dataset.id);
      const foldedTreeSet = new Set(this.state.foldedTreeSet.values());
      if (foldedTreeSet.has(foldedTreeId)) {
        foldedTreeSet.delete(foldedTreeId);
      } else {
        foldedTreeSet.add(foldedTreeId);
      }

      const invisibleTreeSet = new Set(this.state.invisibleTreeSet.values());
      Array.from(treeElement.children).forEach((node) => {
        if (node.classList.contains('document-blob')) return;
        const invisibleTreeId = Number(node.dataset.id);
        if (invisibleTreeSet.has(invisibleTreeId)) {
          invisibleTreeSet.delete(invisibleTreeId);
        } else {
          invisibleTreeSet.add(invisibleTreeId);
        }
      });
      this.setState({ ...this.state, invisibleTreeSet, foldedTreeSet });
    });

    // 문서 이름 클릭 이벤트리스너
    targetElement.addEventListener('click', (e) => {
      if (!e.target.classList.contains('document-blob')) return;
      const documentId = e.target.parentNode.dataset.id;
      pushRoute(`/documents/${documentId}`);
    });

    // 새 문서 버튼 클릭 이벤트리스너
    targetElement.addEventListener('click', async (e) => {
      if (!e.target.closest('.new-document-btn')) return;
      const documentTree = e.target.parentNode.parentNode;
      const newDocument = await postDocument({ title: '', parent: documentTree.dataset.id });

      if (this.state.foldedTreeSet.has(Number(documentTree.dataset.id))) {
        const toggleBtn = documentTree.querySelector('.document-toggle');
        toggleBtn.dispatchEvent(
          new Event('click', {
            bubbles: true,
          }),
        );
      }

      new DocumentTree({
        targetElement: documentTree,
        childDocuments: [{ ...newDocument, documents: [] }],
        invisibleTreeSet: this.state.invisibleTreeSet,
        foldedTreeSet: this.state.foldedTreeSet,
      });

      pushRoute(`/documents/${newDocument.id}`);
    });

    // 삭제 버튼 클릭 이벤트리스너
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
      invisibleTreeSet: this.state.invisibleTreeSet,
      foldedTreeSet: this.state.foldedTreeSet,
    });
  };

  this.init();
}
