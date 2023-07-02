import Component from '@core/Component';

import NotionEditorTitle from '@components//Editor/Title/NotionEditorTitle';
import NotionEditorContent from '@components/Editor/Content/NotionEditorContent';

import './NotionEditor.css';

export default class NotionEditor extends Component {
  template() {
    return `
      <div class="notion-editor-title-wrapper"></div>
      <div class="notion-editor-content-wrapper"></div>
    `;
  }

  mount() {
    const { title, content } = this;
    const $titleEditor = this.$target.querySelector(
      '.notion-editor-title-wrapper'
    );
    const $contentEditor = this.$target.querySelector(
      '.notion-editor-content-wrapper'
    );

    this.$titleEditor = new NotionEditorTitle($titleEditor, { title });
    this.$contentEditor = new NotionEditorContent($contentEditor, { content });
  }

  get title() {
    const { documentData } = this.props;
    const { title } = documentData;

    return title;
  }

  get content() {
    const { documentData } = this.props;
    const { content } = documentData;

    return content;
  }

  setEvent() {
    const { onEdit } = this.props;

    this.$target.addEventListener('input', ({ target }) => {
      const { name } = target;
      const { documentData } = this.props;

      if (documentData[name] === undefined) return;
      onEdit({
        ...documentData,
        [name]: target.value,
      });
    });
  }
}
