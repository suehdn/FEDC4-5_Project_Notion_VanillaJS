import { isConstructor } from "@Utils/validation";

export default function Home({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $home = document.createElement("div");

  this.setState = () => {
    this.render();
  };

  this.render = () => {
    $target.appendChild($home);
    $home.innerHTML = "home";
  };
}
