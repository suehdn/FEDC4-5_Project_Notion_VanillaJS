import { updateDocument } from '@api/document';

import { setItem } from '@utils/localStorage';

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

      const updatedDocument = await updateDocument(document.id, document);
      this.setState({
        ...this.state,
        ...updatedDocument,
      });
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
