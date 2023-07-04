import { isConstructor } from "@Utils/validation";

export default function Home({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $home = document.createElement("div");
  $target.appendChild($home);

  this.render = () => {
    $home.innerHTML = "home";
  };

  this.render();
}
