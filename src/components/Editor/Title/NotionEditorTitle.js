import Component from '@core/Component';

import './NotionEditorTitle.css';

export default class NotionEditorTitle extends Component {
  setup() {
    this.state = {
      title: '',
    };
  }

  initComponent() {
    this.$title = document.createElement('input');

    this.$title.className = 'notion-editor-title';
    this.$title.type = 'text';
    this.$title.name = 'title';
    this.$title.placeholder = 'undefined';

    this.$target.appendChild(this.$title);
  }

  render() {
    const { title } = this.state;

    this.$title.value = title ?? '';
  }
}
