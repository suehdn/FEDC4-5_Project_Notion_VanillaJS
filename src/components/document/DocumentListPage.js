import DocumentList from "./documentList.js";
import DocumentListEditor from "./DocumentListEditor.js";

export default class DocumentListPage {
  constructor({ $target, store }) {
    this.$documentPage = document.createElement("setion");
    $target.appendChild(this.$documentPage);

    this.render({ store });
  }

  render({ store }) {
    new DocumentList({
      $target: this.$documentPage,
      store,
    });
  }
}
