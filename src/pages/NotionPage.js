import { request } from '../api.js';
import DocumentList from '../components/DocumentList.js';
import CreateButton from '../components/CreateButton.js';

export default function NotionPage({ $target }) {
  const $sidebarContainer = document.createElement('div');
  $sidebarContainer.classList.add('sidebar');
  $target.appendChild($sidebarContainer);

  this.state = {
    documents: [],
    selectedDocumentId: null,
  };

  const documentList = new DocumentList({
    $target: $sidebarContainer,
    initialState: {
      documents: this.state.documents,
    },
    onCreate: async (documentId) => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '', parent: documentId }),
      });

      this.setState({
        ...this.state,
        selectedDocumentId: createdDocument.id,
      });

      const documents = await request('/documents');
      this.setState({
        ...this.state,
        documents,
      });
    },
    onDelete: async (documentId) => {
      await request(`/documents/${documentId}`, {
        method: 'DELETE',
      });

      const documents = await request('/documents');
      this.setState({
        ...this.state,
        documents,
        selectedDocumentId:
          documentId === this.state.selectedDocumentId
            ? documents[0]?.id ?? document.id
            : this.state.selectedDocumentId,
      });
    },
    onSelect: async (documentId) => {
      if (documentId !== this.state.selectedDocumentId) {
        this.setState({
          ...this.state,
          selectedDocumentId: documentId,
        });
      }
    },
  });

  new CreateButton({
    $target: $sidebarContainer,
    initialState: {
      text: '페이지 추가',
    },
    onClick: async () => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '', parent: null }),
      });
      const documents = await request('/documents');

      this.setState({
        ...this.state,
        documents,
        selectedDocumentId: createdDocument.id,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;

    documentList.setState({
      documents: this.state.documents,
    });
  };

  const init = async () => {
    const documents = await request('/documents');

    this.setState({
      ...this.state,
      documents,
    });
  };

  init();
}
