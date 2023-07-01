import newDocButton from "./ui/newDocButton"

export default function DocList({ $target, initialState = [], renderSideBar }) {
  this.state = initialState

  this.render = async () => {
    this.state.forEach(async (doc) => {
      const $child = document.createElement("ul")
      $child.className = "doc-list"
      $child.dataset.id = doc.id
      const $container = document.createElement("div")
      $container.className = "doc-node-container"
      const $text = document.createElement("span")
      $text.className = "doc-text"
      $text.innerText = doc.title
      $text.addEventListener("click", (e) => {
        history.pushState({ id: doc.id }, doc.title, `/documents/${doc.id}`)
      })
      $container.appendChild($text)
      $child.appendChild($container)
      new newDocButton({ $target: $container, parentId: doc.id, renderSideBar })

      if (doc.documents.length) {
        new DocList({ $target: $child, initialState: doc.documents, renderSideBar })
      }

      await $target.appendChild($child)
    })
  }

  this.render()
}
