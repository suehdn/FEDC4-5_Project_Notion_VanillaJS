import { deleteDocument } from "../../api"

export default function Editor({ $target, initialState = {}, onEditing, renderApp }) {
  this.state = initialState
  let isInitialize = false
  const $editor = document.createElement("div")
  $editor.className = "editor"
  $target.appendChild($editor)

  this.setState = (nextState) => {
    this.state = nextState
    console.log("hi", this.state)
    $editor.querySelector("input[name=title]").value = this.state.title
    $editor.querySelector("textarea[name=content]").value = this.state.content
    $editor.querySelector(".doc-delete-button").addEventListener("click", async () => {
      await deleteDocument(this.state.id)
      $editor.querySelector(".doc-delete-button").style.display = "none"
      history.replaceState(null, null, "/")
      this.setState({ title: "", content: "" })
      renderApp()
    })

    this.render()
  }

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <div class='doc-nav'>
          <input type="text" class='doc-title' name="title" value=${this.state.title} />
          <button class='doc-delete-button'>삭제</button>
        </div>
        <textarea name="content" style="width:100%; flex:1;">${this.state.content}</textarea>
    `
    }

    $editor.querySelector(".doc-delete-button").addEventListener("click", async () => {
      await deleteDocument(this.state.id)
      $editor.querySelector(".doc-delete-button").style.display = "none"
      history.replaceState(null, null, "/")
      this.setState({ title: "", content: "" })
      renderApp()
    })

    isInitialize = true
  }
  this.render()

  $editor.addEventListener("keyup", (e) => {
    const { target } = e

    const name = target.getAttribute("name")

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: target.value,
      }

      this.setState(nextState)
      onEditing(nextState)
    }
  })
}
