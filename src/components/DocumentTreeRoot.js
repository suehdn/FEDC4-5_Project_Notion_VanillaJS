import { postDocument, deleteDocument } from '../api';
import { RouteService } from '../utils/RouteService';
import { toggleSet } from '../utils/toggleSet';
import DocumentTree from './DocumentTree';

export default function DocumentTreeRoot({ targetElement, documents }) {
  this.init = () => {
    this.targetElement = targetElement;
    this.setEvent();
    this.render();
  };

  this.state = {
    invisibleTreeSet: new Set(),
    foldedTreeSet: new Set(),
    documents,
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
      toggleSet(foldedTreeSet, foldedTreeId);

      const invisibleTreeSet = new Set(this.state.invisibleTreeSet.values());
      Array.from(treeElement.children).forEach((node) => {
        if (node.classList.contains('document-blob')) return;
        const invisibleTreeId = Number(node.dataset.id);
        toggleSet(invisibleTreeSet, invisibleTreeId);
      });
      this.setState({ ...this.state, invisibleTreeSet, foldedTreeSet });
    });

    // 문서 이름 클릭 이벤트리스너
    targetElement.addEventListener('click', (e) => {
      if (!e.target.classList.contains('document-blob-title')) return;
      const router = new RouteService();
      const documentId = e.target.parentNode.parentNode.dataset.id;
      router.push(`/documents/${documentId}`);
    });

    // 새 문서 버튼 클릭 이벤트리스너
    targetElement.addEventListener('click', async (e) => {
      if (!e.target.closest('.new-document-btn')) return;
      const router = new RouteService();
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

      router.push(`/documents/${newDocument.id}`);
    });

    // 삭제 버튼 클릭 이벤트리스너
    targetElement.addEventListener('click', async (e) => {
      if (!e.target.closest('.delete-document-btn')) return;
      const router = new RouteService();
      const documentTree = e.target.parentNode.parentNode;
      if (confirm('페이지를 삭제하시겠습니까?')) {
        await deleteDocument(documentTree.dataset.id);
        router.start();
      }
    });
  };

  this.render = () => {
    targetElement.innerHTML = '';
    new DocumentTree({
      targetElement,
      childDocuments: this.state.documents,
      invisibleTreeSet: this.state.invisibleTreeSet,
      foldedTreeSet: this.state.foldedTreeSet,
    });
  };

  this.init();
}
