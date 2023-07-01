import { createDocument, updateDocument } from '@api/document';

import { removeItem, setItem } from '@utils/localStorage';
import { history } from '@utils/router';

import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument {
  constructor({ $target }) {
    this.$document = document.createElement('div');
    this.$document.className = 'notion-document';

    $target.appendChild(this.$document);

    this.$editor = new NotionEditor({
      $target: this.$document,
      onEdit: this.onEdit.bind(this),
    });

    this.timer = null;
  }

  onEdit(document) {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      setItem(`temp-post-${document.id}`, {
        ...document,
        tempSaveDate: new Date(),
      });

      const isNew = this.state.id === 'new';
      if (isNew) {
        const createdDocument = await createDocument({ title: document.title });
        history.replace(`/documents/${createdDocument.id}`);
        removeItem('temp-post-new');

        this.setState({
          ...this.state,
          ...createdDocument,
        });
      } else {
        await updateDocument(document.id, document);
        this.setState({
          ...this.state,
          ...document,
        });
      }
    }, 1000);
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState,
    };

    const { id, title, content } = this.state;
    this.$editor.setState({ id, title, content });

    this.render();
  }

  render() {
    const { isVisible } = this.state;

    this.$document.style.visibility = isVisible ? 'visible' : 'hidden';
  }
}
