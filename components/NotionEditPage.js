import Editor from "./Editor.js";
import { request } from "../utils/api.js";

export default function NotionEditPage({ $target, initialState, onRender }) {
  const $page = document.createElement("div");
  $page.className = "notionEditPage";

  $target.appendChild($page);

  this.state = initialState;

  this.setState = async (nextState) => {
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
  };

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state,
    onEditing: (notion) => {
      if (timer !== null) {
        clearTimeout(timer);
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

  const fetchNotion = async () => {
    const { notionId } = this.state;

    if (notionId !== "new") {
      const notion = await request(`/documents/${notionId}`);
      this.setState({
        ...this.state,
        notion,
      });
    }
  };
}
