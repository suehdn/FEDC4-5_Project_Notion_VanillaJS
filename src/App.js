import PostPage from "./PostPage.js";

export default function App({ $target, username }) {
  const postPage = new PostPage({ $target, username });

  postPage.render();
}
