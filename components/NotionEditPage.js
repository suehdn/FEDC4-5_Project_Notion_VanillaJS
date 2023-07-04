import Editor from "./Editor.js";
import { request } from "../utils/api.js";

export default function NotionEditPage({ $target, initialState, onRender }) {
  const $page = document.createElement("div");
  $page.className = "notionEditPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = async (nextState) => {
    if (nextState === "") {
      editor.setState(nextState);
    } else {
      const previousState = this.state;
      this.state = nextState;
      if (previousState.notionId !== nextState.notionId) {
        await fetchNotion();
        return;
      }
      this.render();
      editor.setState(
        this.state.notion || {
          title: "",
          content: "",
        }
      );
    }
  };

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state,
    onEditing: (notion) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      if (notion.title === "") {
        notion.title = "제목 없음";
      }
      timer = setTimeout(async () => {
        await request(`/documents/${this.state.notionId}`, {
          method: "PUT",
          body: JSON.stringify(notion),
        });
        onRender();
      }, 2000);
    },
  });

  this.render = () => {
    editor.render();
  };

  this.render();

  const fetchNotion = async () => {
    const { notionId } = this.state;

    if (notionId !== "") {
      const notion = await request(`/documents/${notionId}`);
      this.setState({
        ...this.state,
        notion,
      });
    }
  };
}
