import DocList from "../../components/docList"

import { getDocuments } from "../../api"

const mockData = [
  {
    id: 1,
    title: "제목1",
    documents: [
      {
        id: 3,
        title: "제목3",
        documents: [],
      },
      {
        id: 4,
        title: "제목4",
        documents: [
          {
            id: 5,
            title: "제목5",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "제목2",
    documents: [],
  },
]

export default function SideBar({ $target, loadDocument }) {
  this.render = async () => {
    const docs = await getDocuments()
    $target.innerHTML = ""
    new DocList({
      $target: $target,
      initialState: docs,
      renderSideBar: this.render,
      loadDocument,
    })
  }

  this.render()
}
