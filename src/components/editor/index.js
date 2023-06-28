export default function Editor({ $target, initialState = [] }) {
  this.render = () => {
    const $editor = document.createElement("textarea")
    $editor.className = "editor"
    $target.appendChild($editor)
  }

  this.render()
}
