export default function DocumentsPage({
  $target,
  initialState,
  onContentView,
  onRemove,
  onAdd,
}) {
  const $page = document.createElement("div");

  $target.appendChild($page);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.appendDocuments = (selectedDocument, $targetElement) => {
    const $div = document.createElement("div");

    $targetElement.appendChild($div);
    $div.innerHTML = `
      ${selectedDocument
        .map(
          (document) =>
            `
            <div class="outliner" data-child-created="false" data-document-id="${document.id}">
              <div class="document">
                <button class="document-view-button">></button>
                <div class="document-title"  >
                  ${document.title}
                </div>
                <button class="see-more-button">...</button>
                <button class="remove-button">삭제</button>
                <button class="add-button">추가</button>
              </div>
            </div>
            `
        )
        .join("")}
    `;
  };

  this.render = () => {
    this.appendDocuments(this.state, $page);
  };

  $page.addEventListener("submit", (event) => {
    const content = event.target.value;
    this.setState(...this.state, { id: 9, content });
  });

  //클릭 이벤트에 해당내용을 넣어서 클릭 할 때마다 많은 내용을 실행하게 되어 비효율적인 코드인지 궁금합니다..!
  $page.addEventListener("click", (event) => {
    const { className } = event.target;
    const $div = event.target.closest(`div[class=outliner]`);
    const { documentId, childCreated } = $div.dataset;

    if (className === "remove-button") {
      onRemove(documentId);
      return;
    } else if (className === "add-button") {
      onAdd(documentId);
      return;
    } else if (className === "document-view-button") {
      if (childCreated === "true") {
        $div.lastChild.style.display =
          $div.lastChild.style.display === "none" ? "block" : "none";
      } else if (childCreated === "false") {
        const stack = [];
        let documents = this.state;
        let selectedDocument = null;
        while (!selectedDocument) {
          selectedDocument = documents.find((document) => {
            if (document.documents.length > 0) stack.push(document.documents);
            return document.id === +documentId;
          });
          if (stack.length > 0) documents = stack.pop();
        }
        this.appendDocuments(selectedDocument.documents, $div);
        $div.dataset.childCreated = "true";
      }
    } else if (className === "document-title") {
      onContentView(documentId);
    }
  });

  this.render();
}
