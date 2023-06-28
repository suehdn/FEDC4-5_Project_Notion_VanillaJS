import DocNode from "./docNode"

export default function DocList({ $target, initialState = [] }) {
  const mockData = [
    {
      id: 1,
      title: "제목1",
      content: "내용1",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
    {
      id: 2,
      title: "제목2",
      content: "내용2",
      createdAt: "2021-01-01",
      updatedAt: "2021-01-01",
    },
  ]

  // this.state = initialState
  this.state = mockData

  this.render = () => {
    $target.innerHTML = `
      <ul class="doc-list">
      </ul>
    `
    const $docList = $target.querySelector(".doc-list")
    this.state.forEach((doc) => {
      new DocNode({
        $target: $docList,
        doc,
      })
    })
  }

  this.render()
}
