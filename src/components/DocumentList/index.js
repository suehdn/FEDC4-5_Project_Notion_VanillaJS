import Document from '@/components/Document';
import { push } from '@router';
import request from '@api';
import { setDocuments } from '@storage';
import LOCAL_STORAGE_KEY from '@constants/storage';
import './style.css';

export default function DocumentList({ $target, initialState, isTopLevelTag = false }) {
  const $documentList = document.createElement('ul');
  $documentList.className = 'DocumentList';

  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const toggleDocument = (document, documentId) => {
    const { id, documents } = document;
    if (id === Number(documentId)) {
      return { ...document, isOpen: !document.isOpen };
    }
    if (Array.isArray(documents) && documents.length > 0) {
      const updateDocuments = documents.map((childDocument) => toggleDocument(childDocument, documentId));
      return { ...document, documents: updateDocuments };
    }
    return document;
  };

  const onToggle = (documentId) => {
    const nextState = this.state.map((document) => toggleDocument(document, documentId));
    setDocuments(LOCAL_STORAGE_KEY, nextState);
    this.setState(nextState);
    push(`/documents/${documentId}`);
  };

  const onAdd = async (documentId) => {
    push(`/documents/${documentId}/new`);
    const res = await request('/documents', {
      method: 'POST',
      body: JSON.stringify({ title: '새로운 문서', parent: documentId ? Number(documentId) : null }),
    });
  };

  if (isTopLevelTag) {
    $documentList.addEventListener('click', ({ target }) => {
      if (!target.closest('.DocumentHeader')) return;
      const { className } = target;
      const { documentId } = target.closest('.DocumentHeader').dataset;
      if (className === 'addDocument') {
        onAdd(documentId);
      } else if (className === 'DocumentTitle') {
        onToggle(documentId);
      }
    });
  }

  this.render = () => {
    $documentList.innerHTML = '';
    this.state.forEach((doc) => {
      new Document({ $target: $documentList, initialState: doc }).setState(doc);
    });
  };
}
