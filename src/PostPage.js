import DocumentList from "./navigation/DocumentList.js";
import { getApi } from "./api.js";

export default function PostPage({ $target, username }) {
  const $page = document.createElement("div");

  const documentList = new DocumentList({
    $target: $target,
    initialState: [],
    username,
  });

  const fetchPosts = async () => {
    const document = await getApi(username);
    documentList.setState(document);
    console.log(document);
  };

  this.render = () => {
    fetchPosts();
    $target.appendChild($page);
  };
}
