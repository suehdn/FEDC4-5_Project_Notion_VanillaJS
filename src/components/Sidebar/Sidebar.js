import { isConstructor, isDrawerState } from "@Utils/validation";
import "./Sidebar.css";
import { once } from "@Utils/once";
import Drawer from "./Drawer";

export default function Sidebar({ $target }) {
  if (!isConstructor(new.target)) {
    return;
  }

  const $sidebar = document.createElement("aside");
  const $rootDrawer = new Drawer({ $target: $sidebar });

  this.state = [];

  this.setState = (nextState) => {
    if (!isDrawerState(nextState)) {
      return;
    }

    this.state = nextState;

    this.render();
  };

  this.init = once(() => {
    $sidebar.className = "sidebar";
    $target.appendChild($sidebar);

    $sidebar.insertAdjacentHTML("afterbegin", `<p>여기는 사이드바!</p>`);
  });

  this.render = () => {
    this.init();
    $rootDrawer.setState(this.state);
  };

  this.render();
}
