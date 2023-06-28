export default function DocNext({ $target, initialState = [] }) {
  this.render = () => {
    const $docNext = document.createElement("div")
    $docNext.className = "docNext"
    $target.appendChild($docNext)
  }

  this.render()
}
