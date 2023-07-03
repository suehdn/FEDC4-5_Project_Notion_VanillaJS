import Component from '@core/Component';

import './NotionEditorContent.css';

export default class NotionEditorContent extends Component {
  setup() {
    this.state = {
      content: '',
    };
  }

  initComponent() {
    this.$content = document.createElement('textarea');

    this.$content.className = 'notion-editor-content';
    this.$content.name = 'content';

    this.$target.appendChild(this.$content);
  }

  render() {
    const { content } = this.state;

    this.$content.value = content;
  }
}
