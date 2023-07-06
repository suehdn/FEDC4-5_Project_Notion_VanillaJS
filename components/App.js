import { request } from "../utils/api.js";
import { initRouter } from "../utils/router.js";
import NotionEditPage from "./NotionEditPage.js";
import NotionPage from "./NotionPage.js";

export default function App({ $target }) {
  const $notionPageContainer = document.createElement("div");
  const $notionEditPageContainer = document.createElement("div");
  $notionPageContainer.className = "notionPageContainer";
  $notionEditPageContainer.className = "notionEditPageContainer";

  const $addNewRootNotion = document.createElement("button");
  $addNewRootNotion.className = "addNewRootNotion";
  $addNewRootNotion.textContent = "+ 페이지 추가";

  const $toggleBtn = document.createElement("button");
  $toggleBtn.className = "toggle-btn1";
  $toggleBtn.innerHTML = `<i class="fa fa-solid fa-arrow-right" style="color: #000000;"></i>`;

  $target.appendChild($toggleBtn);
  $target.appendChild($notionPageContainer);
  $target.appendChild($notionEditPageContainer);
  $notionPageContainer.appendChild($addNewRootNotion);

  const notionPage = new NotionPage({
    $target: $notionPageContainer,
    initialState: [],
    onClick: (id) => {
      const { pathname } = window.location;
      const [, , notionId] = pathname.split("/");
      if (id !== notionId) {
        history.pushState(null, null, `/documents/${id}`);
        this.route();
      }
    },
    onAdd: (id) => {
      fetchAddNotion(id);
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      history.replaceState(null, null, "/");
      this.route();
    },
    $editorPage: $notionEditPageContainer,
    $toggleBtn,
  });

  const editorPage = new NotionEditPage({
    $target: $notionEditPageContainer,
    initialState: "",
    onRender: () => {
      notionPage.render();
    },
  });

  // 라우팅 처리
  this.route = () => {
    const { pathname } = window.location;

    if (pathname === "/") {
      notionPage.render();
      editorPage.setState("");
    } else if (pathname.indexOf("/documents/") === 0) {
      const [, , notionId] = pathname.split("/");
      editorPage.setState({ notionId });
    }
  };

  this.route();

  initRouter(() => this.route());

  // 페이지 추가 후 서버 저장
  const fetchAddNotion = async (id = null) => {
    const createdNotion = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "제목 없음",
        parent: id,
      }),
    });
    history.pushState(null, null, `/documents/${createdNotion.id}`);
    this.route();
    notionPage.render();
  };

  $addNewRootNotion.addEventListener("click", () => {
    fetchAddNotion();
  });

  $toggleBtn.addEventListener("click", () => {
    $notionPageContainer.style.transform = "translateX(0)";
    $notionEditPageContainer.style.marginLeft = "0";
    $toggleBtn.style.transform = "translateX(-160%)";
  });
}
