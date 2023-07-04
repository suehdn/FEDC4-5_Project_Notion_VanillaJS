import { registerStateSetter } from "@Utils/stateSetters";
import Document from "./Document";
import Home from "./Home";
import router from "../router";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import "./App.css";

export default function App({ $target }) {
  // 기본 레이아웃 요소 생성
  const $sidebar = new Sidebar({ $target });

  const $main = document.createElement("div");
  const $header = new Header({ $target: $main });
  const $content = document.createElement("article");

  $main.className = "main-container";

  $main.appendChild($content);
  $target.appendChild($main);

  // route 가능한 요소 등록
  const home = new Home({ $target: $content });
  registerStateSetter(home);

  const hotionDocument = new Document({ $target: $content });
  registerStateSetter(hotionDocument);

  const route = () => router({ $target: $content });
  window.addEventListener("load", route);
  window.addEventListener("popstate", route);
}
