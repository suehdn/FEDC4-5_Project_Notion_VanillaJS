import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument {
  constructor({ $target }) {
    this.$editor = new NotionEditor({ $target });
  }

  setState(nextState) {
    this.state = nextState;

    const { title, content } = this.state;
    this.$editor.setState({ title, content });
  }
}
