import { createDocument } from '@api/document';

import { history } from '@utils/router';

import Button from '@components/Button/Button';
import DocumentList from '@components/DocumentList/DocumentList';

import './NotionSidebar.css';

export default class NotionSidebar {
  constructor({ $target }) {
    this.$sidebar = document.createElement('nav');
    this.$sidebar.className = 'notion-sidebar';

    $target.appendChild(this.$sidebar);

    this.$createButton = new Button({
      $target: this.$sidebar,
      className: 'document-create-button',
      textContent: 'add a document',
      onClick: () => {
        this.handleCreateButtonClick();
      },
    });
    this.$documentList = new DocumentList({ $target: this.$sidebar });
  }

  handleCreateButtonClick = async () => {
    const newDocument = await createDocument({ title: 'Untitled' });
    history.push(`/documents/${newDocument.id}`);
  };

  setState(nextState) {
    this.state = nextState;

    const { documentList } = this.state;
    this.$documentList.setState({ documentList });
  }
}
