import { validateEditorState } from "../utils/validation.js";

export default class Editor {
  constructor({ $target, initialState, onSetState }) {
    this.$target = $target;
    this.state = initialState;

    this.$title = document.createElement("input");
    this.$title.setAttribute("name", "title");
    this.$content = document.createElement("textarea");
    this.$content.setAttribute("name", "content");

    this.$target.append(this.$title, this.$content);

    this.$target.addEventListener("input", (e) => {
      const { target } = e;
      const { name } = target;
      this.setState({ ...this.state, [name]: target.value });
      onSetState(this.state);
      target.focus();
    });

    this.render();
  }

  render = () => {
    this.$title.value = this.state.title;
    this.$content.value = this.state.content;
  };

  setState = (nextState) => {
    try {
      validateEditorState(nextState);
      this.state = nextState;
    } catch (error) {
      console.log(error);
      this.state = { title: "", content: "" };
    }

    this.render();
  };
}
