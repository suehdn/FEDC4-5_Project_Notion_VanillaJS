export default function DocList({ $target, initialState = [] }) {
  this.state = initialState

  this.render = () => {
    this.state.forEach((doc) => {
      const $child = document.createElement("ul")
      $child.className = "doc-list"
      $child.dataset.id = doc.id
      const $text = document.createElement("span")
      $text.className = "doc-text"
      $text.innerText = doc.title
      $child.appendChild($text)

      if (doc.documents.length) {
        new DocList({ $target: $child, initialState: doc.documents })
      }

      $target.appendChild($child)
    })
  }

  this.render()
}
