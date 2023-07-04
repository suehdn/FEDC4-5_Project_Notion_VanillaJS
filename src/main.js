import App from "./App.js";
import PostEditPage from "./PostEditPage.js";

const $app = document.querySelector("#app");
const userName = "nsr";

// new App({ $target: $app, username: userName });

const postEditPage = new PostEditPage({
  $target: $app,
  initialState: {},
  username: userName,
});

postEditPage.setState({ id: 75417 });
