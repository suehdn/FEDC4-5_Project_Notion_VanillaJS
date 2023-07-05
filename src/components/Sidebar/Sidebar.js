import { isConstructor, isSidebarState } from "@Utils/validation";
import "./Sidebar.css";

export default function Sidebar({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $sidebar = document.createElement("aside");
  $sidebar.className = "sidebar";
  $target.appendChild($sidebar);

  this.state = [];

  this.setState = (nextState) => {
    if (!isSidebarState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $sidebar.innerHTML = `
      <p>여기는 사이드바!</p>
    `;
  };

  this.render();
}
