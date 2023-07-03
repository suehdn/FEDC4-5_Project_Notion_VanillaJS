import Component from '@core/Component';

import NotionEditor from '@components/Editor/NotionEditor';

import './NotionDocument.css';

export default class NotionDocument extends Component {
  setup() {
    this.state = {
      documentData: {
        id: this.props.getDocumentId(),
        title: '',
        createdAt: '',
        updatedAt: '',
        content: null,
        documents: [],
      },
    };
  }

  initComponent() {
    this.$document = document.createElement('div');
    this.$document.className = 'notion-document';

    this.$target.appendChild(this.$document);
  }

  initChildComponents() {
    const { onEdit } = this.props;

    this.$editor = new NotionEditor(this.$document, { onEdit });
  }

  setState(nextState) {
    super.setState(nextState);

    const { documentData } = this.state;

    if (documentData.id === null) return;

    const { id, title, content } = documentData;
    this.$editor.setState({ id, title, content });
  }

  render() {
    const { id: documentId } = this.state.documentData;
    const isVisible = documentId !== null;

    this.$document.style.visibility = isVisible ? 'visible' : 'hidden';
  }
}
