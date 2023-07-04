import App from "./App.js";

const $app = document.querySelector("#app");
const userName = "nsr";

new App({ $target: $app, username: userName });
