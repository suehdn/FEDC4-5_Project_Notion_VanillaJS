export default function DocNode({ $target, doc }) {
  this.render = () => {
    const $docNode = document.createElement("li")
    $docNode.innerHTML = `
      <li data-id=${doc.id}>
        <span>${doc.title ?? "no Title"}</span>
      </li>
    `
    $target.appendChild($docNode)
  }
  this.render()
}
