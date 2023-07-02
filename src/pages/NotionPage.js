import { getDocument, getDocumentList, updateDocument } from '@api/document';

import { setItem } from '@utils/localStorage';

import Component from '@core/Component';

import NotionDocument from '@components/NotionDocument/NotionDocument';
import NotionSidebar from '@components/NotionSidebar/NotionSidebar';

import './NotionPage.css';

export default class NotionPage extends Component {
  timer = null;

  setup() {
    this.state = {
      documentList: [],
      documentData: {},
    };
  }

  async fetchData() {
    const documentList = await getDocumentList();
    this.setState({ documentList });

    const { documentId } = this.props;
    if (documentId === null) {
      this.$document.setState({ isVisible: false });
      return;
    }
    const documentData = await getDocument(documentId);

    this.setState({ documentData });
    this.$document.setState({ isVisible: true });
  }

  template() {
    return `
      <aside class="notion-sidebar-wrapper"></aside>
      <main class="notion-document-wrapper"></main>
    `;
  }

  mount() {
    const { documentList, documentData } = this;
    const $sidebar = this.$target.querySelector('.notion-sidebar-wrapper');
    const $document = this.$target.querySelector('.notion-document-wrapper');

    this.$sidebar = new NotionSidebar($sidebar, { documentList });
    this.$document = new NotionDocument($document, {
      documentData,
      onEdit: this.handleEdit.bind(this),
    });
  }

  handleEdit(document) {
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(async () => {
      setItem(`temp-post-${document.id}`, {
        ...document,
        tempSaveDate: new Date(),
      });

      const updatedDocument = await updateDocument(document.id, document);
      this.setState({ documentData: updatedDocument });
      this.$document.setState({ isVisible: true });
    }, 1000);
  }

  get documentList() {
    const { documentList } = this.state;
    return documentList;
  }

  get documentData() {
    const { documentData } = this.state;
    return documentData;
  }
}
