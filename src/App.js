import Component from "./Component/Component.js";
import DocumentTree from "./Component/DocumentTree.js";
import Editor from "./Component/Editor.js";
import { request } from "./api.js";
import { getItem, setItem, removeItem } from "./storage/storage.js";
import { DOCUMENT_DUMMY_DATA, DOCUMENT_TREE_DUMMY_DATA } from "./DUMMY_DATA.js";
import createUUID from "./utils/createUUID.js";

export default class App extends Component {
  async render() {
    this.$target.innerHTML = `
      <aside id='documentTree'></aside>
      <section id='editor'>편집하는 곳</section>
    `;

    const $documentTree = this.$target.querySelector("#documentTree");
    const $editor = this.$target.querySelector("#editor");
    this.documentTree = new DocumentTree({
      $target: $documentTree,
      initialState: await this.getDocumentTree(),
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
            tag: "#addDocumentButton",
            target: "li",
            callback: ({ event, target }) => {
              if (target === null) {
                event.target.parentNode.insertBefore(
                  document.createElement("input"),
                  event.target
                );
                return;
              }

              const [, , $childUl] = target.children;
              target.insertBefore(document.createElement("input"), $childUl);
            },
          },
          {
            action: "click",
            tag: "#deleteDocumentButton",
            target: "li",
            callback: async ({ event, target }) => {
              const { id } = target;
              await request(`/documents/${id}`, {
                method: "DELETE",
              });

              await request("/documents").then(
                (res) => (this.documentTree.state = res)
              );
            },
          },
          {
            action: "change",
            tag: "input",
            target: "li",
            callback: async ({ event, target }) => {
              const { value } = event.target;
              if (target === null) {
                const rootDocument = {
                  id: createUUID(),
                  title: value,
                  parent: null,
                };

                await request("/documents", {
                  method: "POST",
                  body: JSON.stringify(rootDocument),
                });

                await request("/documents").then(
                  (res) => (this.documentTree.state = res)
                );
                return;
              }

              const newDocumentPerentTree = this.findObjectById(
                target.id,
                this.documentTree.state
              );

              const newDocument = {
                id: createUUID(),
                title: value,
                parent: target.id,
              };

              await request("/documents", {
                method: "POST",
                body: JSON.stringify(newDocument),
              });

              await request("/documents").then(
                (res) => (this.documentTree.state = res)
              );
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

  findObjectById(id, arr) {
    const foundObject = arr.find((obj) => obj.id === id);

    if (foundObject) {
      return foundObject;
    }

    return arr.reduce((found, obj) => {
      if (!found && obj.documents.length > 0) {
        return this.findObjectById(id, obj.documents);
      }
      return found;
    }, null);
  }

  async getDocumentTree() {
    return await request("/documents", { mothod: "GET" });
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
