import Component from '@core/Component';

import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument extends Component {
  setup() {
    this.state = {
      isVisible: false,
    };
  }

  template() {
    return `
      <header class="current-path-wrapper"></header>
      <section class="notion-editor-wrapper"></section>
      <footer class="child-path-wrapper"></footer>
    `;
  }

  render() {
    super.render();

    const { isVisible } = this.state;
    this.$target.style.visibility = isVisible ? 'visible' : 'hidden';
  }

  mount() {
    const { documentData, onEdit } = this.props;
    const $editor = this.$target.querySelector('.notion-editor-wrapper');

    this.$editor = new NotionEditor($editor, {
      documentData,
      onEdit,
    });
  }
}
