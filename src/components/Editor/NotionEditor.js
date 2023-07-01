import NotionEditorTitle from '@components//Editor/Title/NotionEditorTitle';
import NotionEditorContent from '@components/Editor/Content/NotionEditorContent';

import './NotionEditor.css';

export default class NotionEditor {
  constructor({ $target }) {
    this.$editor = document.createElement('section');
    this.$editor.className = 'notion-editor';
    $target.appendChild(this.$editor);

    this.$title = new NotionEditorTitle({ $target: this.$editor });
    this.$content = new NotionEditorContent({ $target: this.$editor });
  }

  setState(nextState) {
    this.state = nextState;

    const { title, content } = this.state;
    this.$title.setState({ title });
    this.$content.setState({ content });
  }
}
