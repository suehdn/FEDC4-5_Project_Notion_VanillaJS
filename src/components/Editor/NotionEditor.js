import NotionEditorTitle from '@components//Editor/Title/NotionEditorTitle';
import NotionEditorContent from '@components/Editor/Content/NotionEditorContent';

import './NotionEditor.css';

export default class NotionEditor {
  constructor({ $target, onEdit }) {
    this.$editor = document.createElement('section');
    this.$editor.className = 'notion-editor';
    $target.appendChild(this.$editor);

    this.$title = new NotionEditorTitle({ $target: this.$editor });
    this.$content = new NotionEditorContent({ $target: this.$editor });

    this.initEventListener(onEdit);
  }

  getNextStateWithTarget(target) {
    const name = target.getAttribute('name');
    const value = name === 'title' ? target.value : target.innerHTML;

    return {
      ...this.state,
      [name]: value,
    };
  }

  initEventListener(callback) {
    this.$editor.addEventListener('input', (e) => {
      const nextState = this.getNextStateWithTarget(e.target);
      callback?.(nextState);
    });
  }

  setState(nextState) {
    this.state = nextState;

    const { title, content } = this.state;
    this.$title.setState({ title });
    this.$content.setState({ content });
  }
}
