import { once } from "@Utils/once";
import { setState } from "@Utils/stateSetters";
import { isConstructor } from "@Utils/validation";

export default function Document({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $document = document.createElement("section");

  this.state = {
    documentId: 0,
    title: "",
    content: "",
  };

  this.setState = (nextState) => setState(this.state, nextState, this.render);

  this.init = once(() => {
    $document.innerHTML = `
      <section class="document-title-section">
        <textarea name="title" value="${this.state.title}"></textarea>
      </section>
      <section class="document-content-section">
        <textarea name="content"></textarea>
      </section>
    `;

    $document.querySelectorAll("[name]").forEach(($textarea) => {
      $textarea.addEventListener("input", (e) => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      });
    });
  });

  this.render = () => {
    this.init();
    if ($target.firstElementChild === null) {
      $target.appendChild($document);
    }
  };
}
