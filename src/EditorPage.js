export default function EditorPage({ $target, initialState }) {
  const $page = document.createElement("div");

  $target.appendChild($page);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $page.innerHTML = `
    <h2>${this.state.title}</h2>
    <textarea>${this.state.content}</textarea>
    `;
  };

  this.render();
}
