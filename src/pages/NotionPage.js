import { request } from '../api.js';
import { getItem, setItem, removeItem } from '../utils/storage.js';
import { push } from '../utils/router.js';
import DocumentList from '../components/DocumentList.js';
import CreateButton from '../components/CreateButton.js';
import Editor from '../components/Editor.js';

export default function NotionPage({ $target, initialState }) {
  const $sidebarContainer = document.createElement('div');
  const $notionContainer = document.createElement('div');

  $sidebarContainer.classList.add('sidebar');
  $target.appendChild($sidebarContainer);
  $target.appendChild($notionContainer);

  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;
  let timer = null;
  const doc = getItem(documentLocalSaveKey, {
    title: '',
    content: '',
  });

  const documentList = new DocumentList({
    $target: $sidebarContainer,
    initialState: {
      documents: this.state.documents,
    },
    onCreate: async (id) => {
      const createdDocument = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: '', parent: id }),
      });
      await fetchDocuments();

      push(`/documents/${createdDocument.id}`);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      await fetchDocuments();

      push(`/documents/${id === this.state.documentId ? this.state.documents[0]?.id ?? null : this.state.documentId}`);
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
      await fetchDocuments();

      push(`/documents/${createdDocument.id}`);
    },
  });

  const editor = new Editor({
    $target: $notionContainer,
    initialState: doc,
    onEditing: (document) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(documentLocalSaveKey, {
          ...document,
          tempSaveDate: new Date(),
        });

        await request(`/documents/${this.state.documentId}`, {
          method: 'PUT',
          body: JSON.stringify(document),
        });
        removeItem(documentLocalSaveKey);

        await fetchDocument();
        await fetchDocuments();
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${nextState.documentId}`;
      this.state = nextState;
      await fetchDocument();
      return;
    }

    this.state = nextState;

    documentList.setState({
      documents: this.state.documents,
    });
    editor.setState(
      this.state.document || {
        title: '',
        content: '',
      }
    );
  };

  const fetchDocuments = async () => {
    const documents = await request('/documents');

    this.setState({
      ...this.state,
      documents,
    });
  };

  const fetchDocument = async () => {
    const { documentId } = this.state;

    if (documentId) {
      const document = await request(`/documents/${documentId}`);

      const tempDocument = getItem(documentLocalSaveKey, {
        title: '',
        content: '',
      });

      if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > document.updatedAt) {
        if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            document: tempDocument,
          });
          return;
        }
      }

      this.setState({
        ...this.state,
        document,
      });
    }
  };

  const init = async () => {
    await fetchDocuments();
  };

  init();
}
