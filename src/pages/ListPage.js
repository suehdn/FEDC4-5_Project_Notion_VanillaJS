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
        // 생성 라우트 처리
        createDocumentByTarget({
          target,
          onSubmit: () => this.render(),
        });

        deleteDocumentByTarget({
          target,
          onClick: () => {
            this.render();
          },
        });
      },
    });
    // page에서의 render와  setState에 대해 생각해보자, page는 component와 같이 구성해야되는가?
    this.render();
  }

  render = async () => {
    const documents = await getDocumentsTree();
    this.documentList.setState(documents);
  };
}

//class 수정
const createDocumentByTarget = ({ target, onSubmit }) => {
  const { classList } = target;
  if ((classList.contains("button__add-root") || classList.contains("button__add-document")) && !classList.contains("active")) {
    const $li = target.closest("li");
    const $form = document.createElement("form");
    const $input = document.createElement("input");

    $form.appendChild($input);
    target.before($form);
    classList.add("active");
    $input.focus();

    $input.addEventListener("blur", () => {
      $form.remove();
      classList.remove("active");
    });
    // 반복과정 처리
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = $input.value;

      if ($li) {
        const { id } = $li.dataset;
        const { id: newId } = await createDocument(title, id);
        push(newId);
      } else {
        const { id: newId } = await createDocument(title);
        push(newId);
      }

      onSubmit();
      $input.blur();
    });
  }
};

const deleteDocumentByTarget = async ({ target, onClick }) => {
  if (target.classList.contains("button__delete")) {
    const { pathname } = location;
    const [_, api, nowId] = pathname.split("/");
    const $li = target.closest("li");
    const { id } = $li.dataset;
    if (id) {
      await deleteDocument(`/${id}`);
      push();
      onClick();
    }
  }
};
