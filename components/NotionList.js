import { request } from "../utils/api.js";

export default function NotionList({
  $target,
  initialState,
  onClick,
  onAdd,
  onDelete,
}) {
  const $notionList = document.createElement("div");
  $notionList.className = "notionList";

  $target.appendChild($notionList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const renderNotion = (id, title, documents) => {
      if (documents.length > 0) {
        return `
          <li class="list" data-id="${id}">
            ${title.length > 10 ? title.slice(0, 10) + "..." : title}
            <div class="btnContainer">
              <button class="removeBtn" data-id="${id}">❌</button>
              <button class="addBtn" data-id="${id}">➕</button>
            </div>
          </li>
          <ul>
            ${documents
              .map(
                ({ id, title, documents }) => `
              ${renderNotion(id, title, documents)}
            `
              )
              .join("")}
          </ul>
        `;
      } else {
        return `
          <li class="list" data-id="${id}">
          ${title.length > 10 ? title.slice(0, 10) + "..." : title}
            <div class="btnContainer">
              <button class="removeBtn" data-id="${id}">❌</button>
              <button class="addBtn" data-id="${id}">➕</button>
            </div>
          </li>
        `;
      }
    };

    $notionList.innerHTML = `
      <ul class="notions">
        ${this.state
          .map(
            ({ id, title, documents }) => `
              ${renderNotion(id, title, documents)}
            `
          )
          .join("")}
      </ul>
    `;
  };

  this.render();

  $notionList.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.className === "list") {
      onClick(id);
    } else if (e.target.className === "addBtn") {
      onAdd(id);
    } else {
      onDelete(id);
    }
  });
}
