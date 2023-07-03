import Component from "./Component.js";

export default class DocumentTree extends Component {
  render() {
    console.log(this.state);
    if (this.state.length === 0) {
      this.$target.innerHTML = `
        <button id="addDocumentButton">+</button>
      `;
      return;
    }
    this.$target.innerHTML = "";
    this.getTemplate(this.state).forEach((child) =>
      this.$target.appendChild(child)
    );
  }

  getTemplate(documentTree) {
    return documentTree.map((doc) => {
      const $li = document.createElement("li");
      $li.textContent = doc.title;
      $li.id = `${doc.id}`;

      $li.innerHTML = `
        <a href="/document/${doc.id}">${doc.title}</a>
        <button id="addDocumentButton" data-id="${doc.id}">+</button>
        <button id="deleteDocumentButton" data-id="${doc.id}">삭제</button>
      `;

      if (doc.documents.length > 0) {
        const $ul = document.createElement("ul");
        const children = this.getTemplate(doc.documents);
        children.forEach((child) => $ul.appendChild(child));
        $li.appendChild($ul);
      }

      return $li;
    });
  }
}
