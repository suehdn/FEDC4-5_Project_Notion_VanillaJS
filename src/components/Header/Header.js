import { isConstructor } from "@Utils/validation";
import "./Header.css";

export default function Header({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $header = document.createElement("header");
  $header.className = "header";
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <p class="header-title">여기는 헤더!</p>
    `;
  };

  this.render();
}
