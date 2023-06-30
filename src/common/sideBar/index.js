import DocList from "../../components/docList"

export default function SideBar({ $target, initialState = [] }) {
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
  this.render = () => {
    new DocList({
      $target: $target,
      initialState: mockData,
    })
  }

  this.render()
}
