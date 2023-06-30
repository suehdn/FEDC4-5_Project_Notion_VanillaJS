export default class DocumentListEditor {
  constructor({ $target, store }) {
    this.$editor = document.createElement("span");
    $target.appendChild(this.$editor);

    this.$editor.classList.add("document-list-editor");
    this.render();
  }

  render() {
    this.$editor.innerHTML = `
        <button>생성</button>
        <button>삭제</button>
    `;
  }

  hide() {
    this.$editor.style.display = "none";
  }

  show() {
    this.$editor.style.display = "inline-block";
  }
}
