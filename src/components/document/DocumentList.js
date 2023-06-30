import { DocumentListEditor } from "./index";

export default class DocumentList {
  constructor({ $target, store }) {
    this.$list = document.createElement("ul");

    this.initEvent();
    $target.appendChild(this.$list);
    this.render({ store });
  }

  initEvent() {
    this.$list.addEventListener("click", (event) => {
      const targetDocument = event.target;
      if (targetDocument.classList.contains("select-document")) {
        console.log(targetDocument);
      }
    });

    this.$list.addEventListener("mouseover", (event) => {
      const targetDocument = event.target;

      if (targetDocument.documentListEditor) {
        targetDocument.documentListEditor.show();
        return;
      }

      if (targetDocument.matches(".select-document")) {
        const documentListEditor = new DocumentListEditor({
          $target: targetDocument,
        });

        targetDocument.documentListEditor = documentListEditor;

        targetDocument.addEventListener("mouseleave", () => {
          targetDocument.documentListEditor.hide();
        });
      }
    });
  }

  createCustomListString(document, string) {
    const nextDocument = document.documents;
    string += `<li id=${document.id} class="select-document">
      ${document.title}
      </li>`;
    if (!!nextDocument) {
      string += "<ul>";
      for (const documents of nextDocument) {
        string = this.createCustomListString(documents, string);
      }
      string += "</ul>";
    }
    return string;
  }

  async render({ store }) {
    // await store.documentsGet();
    const { documentsTree } = store.state;
    const htmlString = documentsTree.reduce((acc, doc) => {
      return this.createCustomListString(doc, acc);
    }, "");
    this.$list.innerHTML = htmlString;
  }
}

// const post = await request("/documents");
// console.log(post);
