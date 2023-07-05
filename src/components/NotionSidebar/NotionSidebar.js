import { SIDEBAR } from '@consts/target';

import { createDocument } from '@api/document';

import { history } from '@utils/router';

import Component from '@core/Component';

import Button from '@components/Button/Button';
import DocumentList from '@components/DocumentList/DocumentList';

import './NotionSidebar.css';

export default class NotionSidebar extends Component {
  setup() {
    this.state = {
      documentList: [],
    };
  }

  initComponent() {
    this.$sidebar = document.createElement('nav');
    this.$sidebar.className = SIDEBAR.ROOT;

    this.$target.appendChild(this.$sidebar);
  }

  initChildComponents() {
    this.$createButton = new Button(this.$sidebar, {
      className: SIDEBAR.CREATE_BUTTON,
      textContent: 'add a document',
      onClick: () => {
        this.handleCreateButtonClick();
      },
    });

    this.$documentList = new DocumentList(this.$sidebar);
  }

  handleCreateButtonClick = async () => {
    const newDocument = await createDocument({ title: 'Untitled' });
    history.push(`/documents/${newDocument.id}`);
  };

  setState(nextState) {
    super.setState(nextState);

    const { documentList } = this.state;
    this.$documentList.setState({ documentList });
  }
}
