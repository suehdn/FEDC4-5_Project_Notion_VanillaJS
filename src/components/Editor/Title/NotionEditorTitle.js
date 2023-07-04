import Component from '@core/Component';

import './NotionEditorTitle.css';

export default class NotionEditorTitle extends Component {
  timer = null;

  setup() {
    this.state = {
      title: '',
    };
  }

  initComponent() {
    this.$titleEditor = document.createElement('input');

    this.$titleEditor.className = 'notion-editor-title';
    this.$titleEditor.type = 'text';
    this.$titleEditor.dataset.name = 'title';
    this.$titleEditor.placeholder = 'undefined';

    this.$target.appendChild(this.$titleEditor);
  }

  setEvent() {
    const { onEdit } = this.props;

    this.$titleEditor.addEventListener('input', ({ target }) => {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(async () => {
        onEdit('title', target.value);
      }, 1000);
    });
  }

  render() {
    const { title } = this.state;

    this.$titleEditor.value = title ?? '';
  }
}
