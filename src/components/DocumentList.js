export default class DocumentList {
  constructor({ $target, initialState }) {
    this.state = initialState;
    this.$target = $target;

    this.render();
  }
  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  render = () => {
    const stateHTML = this.#convertIntoHTML(this.state);
    this.$target.innerHTML = stateHTML;
  };

  #convertIntoHTML = (state) => {
    return `<ul>
    ${state
      .map(
        (document) => `<li data-id=${document.id}>${document.title}
      ${document.documents.length > 0 ? this.#convertIntoHTML(document.documents) : ""}</li>`
      )
      .join(" ")}
    </ul>`;
  };
}
