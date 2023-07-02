import { createDocument } from '@api/document';

import { history } from '@utils/router';

import Component from '@core/Component';

import Button from '@components/Button/Button';
import DocumentList from '@components/DocumentList/DocumentList';

import './NotionSidebar.css';

export default class NotionSidebar extends Component {
  template() {
    return `
      <nav class="notion-sidebar">
        <div class="create-button-wrapper"></div>
        <ul class="document-list"></ul>
      </nav>
    `;
  }

  mount() {
    const { documentList } = this.props;
    const $createButtonWrapper = this.$target.querySelector(
      '.create-button-wrapper'
    );
    const $documentList = this.$target.querySelector('.document-list');

    this.$createButton = new Button($createButtonWrapper, {
      className: 'document-create-button',
      textContent: 'add a document',
      onClick: () => {
        this.handleCreateButtonClick();
      },
    });

    this.$documentList = new DocumentList($documentList, { documentList });
  }

  handleCreateButtonClick = async () => {
    const newDocument = await createDocument({ title: 'Untitled' });
    history.push(`/documents/${newDocument.id}`);
  };

  setState(nextState) {
    super.setState(nextState);

    const { documentList } = this.props;
    this.$documentList.setState({ documentList });
  }
}
