import Editor from './Editor.js';
import { request } from '../apis/api.js';
import { setLocalItem, getLocalItem, removeLocalItem } from '../utils/storage.js';
import LinkButton from './LinkButton.js';

export default function DocumentEditPage({ $target, initialState }) {
  const $page = document.createElement('div');
  this.state = initialState;

  let documentLocalSaveKey = `temp-document-${this.state.documentId}`;

  const documents = getLocalItem(documentLocalSaveKey, {
    title: '',
    content: '',
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: documents,
    onEditing: (documents) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setLocalItem(documentLocalSaveKey, {
          ...documents,
          tempSaveDate: new Date(),
        });

        const isNew = this.state.documentId === 'new';

        if (isNew) {
          const createdDocument = await request('/documents', {
            method: 'POST',
            body: JSON.stringify(documents),
          });

          history.replaceState(null, null, `/documents/${createdDocument.id}`);
          removeLocalItem(documentLocalSaveKey);

          this.setState({
            documentId: createdDocument.id,
          });
        } else {
          await request(`/documents/${documents.id}`, {
            method: 'PUT',
            body: JSON.stringify(documents),
          });
          removeLocalItem(documentLocalSaveKey);
        }
      }, 2000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      documentLocalSaveKey = `temp-document-${nextState.documentId}`;

      this.state = nextState;

      if (this.state.documentId === 'new') {
        const documents = getLocalItem(documentLocalSaveKey, {
          title: '',
          contents: '',
        });
        this.render();
        editor.setState(documents);
      } else {
        await fetchPost();
      }

      return;
    }

    this.state = nextState;
    this.render();

    editor.setState(this.state.documents || { title: '', content: '' });
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { documentId } = this.state;

    if (documentId !== 'new') {
      const documents = await request(`/documents/${documentId}`);

      const tempDocument = getLocalItem(documentLocalSaveKey, {
        title: '',
        content: '',
      });

      if (tempDocument.tempSaveDate && tempDocument.tempSaveDate > documents.updatedAt) {
        if (confirm('불러올까요?')) {
          this.setState({
            ...this.state,
            documents: tempDocument,
          });
          return;
        }
      }
      this.setState({
        ...this.state,
        documents,
      });
    }
  };

  new LinkButton({
    $target: $page,
    initialState: {
      text: '목록',
      link: '/',
    },
  });
}
