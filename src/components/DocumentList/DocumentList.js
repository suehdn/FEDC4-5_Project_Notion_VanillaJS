import { createDocument, deleteDocument } from '@api/document';

import { history } from '@utils/router';

import Component from '@core/Component';

import DocumentListItem from '@components/DocumentList/Item/DocumentListItem';

import './DocumentList.css';

export default class DocumentList extends Component {
  setup() {
    this.state = {
      documentList: [],
    };
  }

  render() {
    super.render();

    const { documentList } = this.props;
    if (documentList.length === 0) return;

    documentList.forEach((document) => {
      const $documentItem = this.createDocumentItem(document);
      this.$target.appendChild($documentItem);
    });
  }

  setEvent() {
    this.addEvent('click', 'li', ({ target }) => {
      const $li = target.closest('li');

      const { id } = $li.dataset;
      const { className } = target;

      if (className === 'document-delete-button') {
        this.hanldeDeleteButtonClick(id);
        return;
      }

      if (className === 'document-create-inside-button') {
        this.handleCreateIndsideButtonClick(id);
        return;
      }
      history.push(`/documents/${id}`);
    });
  }

  handleCreateIndsideButtonClick = async (id) => {
    const newDocument = await createDocument({ title: 'Untitled', parent: id });
    history.push(`/documents/${newDocument.id}`);
  };

  hanldeDeleteButtonClick = async (id) => {
    await deleteDocument(id);
    history.push('/');
  };

  createDocumentItem(item, depth = 1) {
    const $div = document.createElement('div');

    const $documentItem = new DocumentListItem({ $target: $div });
    $documentItem.setState({
      documentItem: item,
      depth,
    });

    const { documents: childItems } = item;

    if (childItems.length > 0) {
      const $ul = document.createElement('ul');
      childItems.forEach((childItem) => {
        $ul.appendChild(this.createDocumentItem(childItem, depth + 1));
      });
      $div.appendChild($ul);
    }

    return $div;
  }
}
