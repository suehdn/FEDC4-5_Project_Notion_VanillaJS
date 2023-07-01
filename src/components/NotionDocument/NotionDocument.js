import { setItem } from '@utils/localStorage';

import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument {
  constructor({ $target }) {
    this.$editor = new NotionEditor({
      $target,
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
    }, 1000);

    const nextState = {
      ...this.state,
      ...document,
    };
    this.setState(nextState);
  }

  setState(nextState) {
    this.state = nextState;

    const { title, content } = this.state;
    this.$editor.setState({ title, content });
  }
}
