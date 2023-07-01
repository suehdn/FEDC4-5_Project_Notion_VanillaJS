export default function Editor({ $target, initialState, onEditing }) {
  const $editor = document.createElement("div");
  $editor.className = "editor";

  $target.appendChild($editor);

  this.state = initialState;

  let isInitialize = false;

  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").innerHTML = this.state.content;
    this.render();
  };

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <input type="text" name="title" placeholder="제목 없음" value="${this.state.title}" />
        <label for="myInput"></label>
        <div class="content" contentEditable="true" name="content">${this.state.content}</div>
      `;
      isInitialize = true;
    }
  };

  this.render();

  $editor.querySelector("[name=title]").addEventListener("keyup", (e) => {
    const nextState = {
      ...this.state,
      title: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  });

  let timer = null;

  $editor.querySelector("[name=content]").addEventListener("input", (e) => {
    const nextState = {
      ...this.state,
      content: e.target.innerHTML,
    };
    onEditing(nextState);
  });
}
