import PostList from "./PostList.js";
import { getApi } from "./api.js";

const DUMMY_DATA = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

export default function PostPage({ $target, username }) {
  const $page = document.createElement("div");

  const postList = new PostList({
    $target: $target,
    initialState: [],
  });

  const fetchPosts = async () => {
    const document = await getApi(username);
    postList.setState(document);
  };

  this.render = () => {
    fetchPosts();
    $target.appendChild($page);
  };
}
