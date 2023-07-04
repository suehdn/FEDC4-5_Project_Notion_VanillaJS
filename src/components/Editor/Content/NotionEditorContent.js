import { Document } from '@utils/editor';

import Component from '@core/Component';

import './NotionEditorContent.css';

export default class NotionEditorContent extends Component {
  timer = null;

  setup() {
    this.state = {
      content: '',
    };
  }

  initComponent() {
    this.$contentEditor = document.createElement('div');

    this.$contentEditor.contentEditable = true;
    this.$contentEditor.className = 'notion-editor-content';
    this.$contentEditor.dataset.name = 'content';

    this.$target.appendChild(this.$contentEditor);
  }

  setEvent() {
    const { onEdit } = this.props;

    this.$contentEditor.addEventListener('input', ({ target }) => {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        const value = Document.stringify(target.innerHTML);
        onEdit('content', value);
      }, 1000);
    });
  }

  render() {
    const { content } = this.state;

    this.$contentEditor.innerHTML = Document.parse(content ?? '');
  }
}
