import Component from '@core/Component';

import './NotionEditorTitle.css';

export default class NotionEditorTitle extends Component {
  template() {
    const { title } = this.props;

    return `
      <input
        class="notion-editor-title"
        name="title"
        type="text"
        placeholder="undefined"
        value="${title}"
      />
    `;
  }
}
