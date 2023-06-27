export default class Editor {
  constructor({
    $parent,
    initialState = {
      id: 1,
      title: "",
      content: "",
      createdAt: "",
      updatedAt: "",
    },
  }) {
    this.$target = document.createElement("div");
    this.$target.className = "editor";
    $parent.append(this.$target);

    this.state = initialState;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = `
      <input type="text" name="title" style="width: 600px;" value="${this.state.title}" />
      <textarea name="content" style="width: 600px; height: 400px;">${this.state.content}</textarea>
    `;
  }
}
