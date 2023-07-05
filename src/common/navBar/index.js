export default function NavBar({ $target, loadDocument }) {
  const onClickTitle = () => {
    history.pushState(null, null, "/")
    loadDocument()
  }
  this.render = () => {
    $target.innerHTML = `
        <div class='title'>NoNotion</div>
        `
    $target.querySelector(".title").addEventListener("click", onClickTitle)
  }

  this.render()
}
