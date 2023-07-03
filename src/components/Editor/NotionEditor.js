import Component from '@core/Component';

import NotionEditorTitle from '@components//Editor/Title/NotionEditorTitle';
import NotionEditorContent from '@components/Editor/Content/NotionEditorContent';

import './NotionEditor.css';

export default class NotionEditor extends Component {
  initComponent() {
    this.$editor = document.createElement('section');
    this.$editor.className = 'notion-editor';
    this.$target.appendChild(this.$editor);
  }

  initChildComponents() {
    this.$title = new NotionEditorTitle(this.$editor);
    this.$content = new NotionEditorContent(this.$editor);
  }

  setEvent() {
    const { onEdit } = this.props;
    this.$editor.addEventListener('input', ({ target }) => {
      const name = target.getAttribute('name');
      const { value } = target;

      onEdit(name, {
        ...this.state,
        [name]: value,
      });
    });
  }

  setState(newstate) {
    super.setState(newstate);

    const { title, content } = this.state;
    this.$title.setState({ title });
    this.$content.setState({ content });
  }
}
