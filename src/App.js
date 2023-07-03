import Component from "./Component/Component.js";
import DocumentTree from "./Component/DocumentTree.js";
import Editor from "./Component/Editor.js";
import { request } from "./api.js";
import { getItem, setItem, removeItem } from "./storage/storage.js";
import { DOCUMENT_DUMMY_DATA, DOCUMENT_TREE_DUMMY_DATA } from "./DUMMY_DATA.js";

export default class App extends Component {
  render() {
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'>편집하는 곳</section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    new DocumentTree({
      $target: $documentTree,
      initialState: DOCUMENT_TREE_DUMMY_DATA,
      props: {
        events: [
          {
            action: "click",
            tag: "a",
            target: "a",
            callback: ({ event }) => {
              event.preventDefault();
              history.pushState(null, null, event.target.href);
              this.route();
            },
          },
          {
            action: "click",
            tag: "button",
            target: "li",
            callback: ({ event, target }) => {
              target.appendChild(document.createElement("input"));
            },
          },
        ],
      },
    });

    this.editor = new Editor({
      $target: $editor,
      initialState: DOCUMENT_DUMMY_DATA,
      props: {
        events: [
          {
            action: "keyup",
            tag: "div",
            target: "div",
            callback: ({ target }) => {
              const { dataset, innerHTML } = target;
              console.log(dataset.id, innerHTML);
              const key = "document/" + dataset.id;
              setItem(key, {
                ...this.editor.state,
                content: innerHTML,
                tmpSaveDate: new Date(),
              });
            },
          },
          {
            action: "click",
            tag: "button",
            target: "div",
            callback: ({ event, target }) => {
              // 여기서 서버에 저장하는 로직을 구현하면 됩니다.
              // await request(`/documents/${target.children.textarea.dataset.id}`,{
              //   method:'PUT',
              //   body: JSON.stringify(this.editor.state)
              // })
              alert("저장되었습니다.");
              removeItem("document/" + target.children.textarea.dataset.id);
            },
          },
        ],
      },
    });
  }

  async route() {
    const { pathname } = window.location;
    const [, , documentId] = pathname.split("/");
    const tmpDocument = getItem("document/" + documentId);
    // 서버에서 데이터 불러오기
    // const { data } = await request(`/documents/${documentId}`)
    const FETCH_DUMMY_DATA = {
      id: 1,
      title: "노션을 만들자",
      content: "FETCH_DUMMY_DATA",
      documents: [
        {
          id: 2,
          title: "",
          createdAt: "",
          updatedAt: "",
        },
      ],
      createdAt: "",
      updatedAt: "2022-06-30T07:34:33.979Z",
    };
    if (tmpDocument && tmpDocument.tmpSaveDate > FETCH_DUMMY_DATA.updatedAt) {
      if (confirm("임시저장된 데이터가 있습니다. 불러오시겠습니까?")) {
        this.editor.state = tmpDocument;
        return;
      }
    }
    this.editor.state = FETCH_DUMMY_DATA;
  }
}
