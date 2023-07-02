import Component from '@core/Component';

import './NotionEditorContent.css';

export default class NotionEditorContent extends Component {
  template() {
    const { content } = this.props;

    return `
      <textarea
        class="notion-editor-content"
        name="content"
      >${content ?? ''}</textarea>
    `;
  }
}
