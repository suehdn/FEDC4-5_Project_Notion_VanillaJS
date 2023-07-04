import App from "./App.js";

const $app = document.querySelector("#app");
const userName = "haya";

new App({ $target: $app, username: userName });
