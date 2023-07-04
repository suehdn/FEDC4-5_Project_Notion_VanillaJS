import Editor from "./Editor.js";
import { setItem, getItem } from "./storage.js";
import { getApi } from "./api.js";

export default function PostEditPage({ $target, initialState, username }) {
  const $page = document.createElement("div");

  this.state = initialState;

  const TEMP_DOCUMENT_SAVE_KEY = `temp-document-${this.state.id}`;

  const post = getItem(TEMP_DOCUMENT_SAVE_KEY, {
    title: "",
    content: "",
  });

  let timer = null;

  const editor = new Editor({
    $target: $page,
    initialState: this.state.post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setItem(TEMP_DOCUMENT_SAVE_KEY, {
          ...post,
          saveDate: new Date(),
        });
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.id !== nextState.id) {
      this.state = nextState;
      await fetchPost();
      return;
    }
    this.state = nextState;
    this.render();

    editor.setState(this.state.post);
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const fetchPost = async () => {
    const { id } = this.state;
    if (id !== 0) {
      const post = await getApi(username, id);
      console.log(post);
      this.setState({
        ...this.state,
        post,
      });
    }
  };
}
