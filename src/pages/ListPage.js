import DocumentList from "../components/DocumentList.js";
import { getDocumentsTree, createDocument, deleteDocument } from "../utils/api.js";
import { push } from "../utils/router.js";
// 컴포넌트는 화면 출력에 , page에서 복잡한 로직들 처리
// 출력을 어떻게 해주어야 되나? initialState를 어떻게 처리
// trim 공백 처리
export default class ListPage {
  constructor({ $target }) {
    this.documentList = new DocumentList({
      $target,
      initialState: [],
      onClickButton: (target) => {
        if (target.tagName === "LI") push(target.dataset.id);
        createDocumentByButton(target, () => this.render());
        deleteDocumentByButton(target, () => this.render());
      },
    });

    this.render();
  }

  render = async () => {
    const documents = await getDocumentsTree();
    this.documentList.setState(documents);
  };
}

const createDocumentByButton = (button, onSubmit) => {
  const { classList } = button;
  if ((classList.contains("list__add-button--root") || classList.contains("list__add-button--document")) && !classList.contains("active")) {
    const $li = button.closest("li");
    const $form = document.createElement("form");
    const $input = document.createElement("input");
    $form.appendChild($input);
    button.before($form);
    classList.add("active");
    $input.focus();

    $input.addEventListener("blur", () => {
      $form.remove();
      classList.remove("active");
    });

    $form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = $input.value.trim();
      if (title === "") {
        alert("title을 입력해주요");
        return;
      }
      createAndPush(title, $li);
      onSubmit();
      $input.blur();
    });
  }
};

const createAndPush = async (title, parent) => {
  if (parent) {
    const { id } = parent.dataset;
    const { id: createdId } = await createDocument(title, id);
    push(createdId);
  } else {
    const { id: createdId } = await createDocument(title);
    push(createdId);
  }
};

const deleteDocumentByButton = async (button, onClick) => {
  if (button.classList.contains("list__add-button--delete")) {
    const $li = button.closest("li");
    const { id } = $li.dataset;
    if (id) {
      await deleteDocument(`/${id}`);
      push();
      onClick();
    }
  }
};
