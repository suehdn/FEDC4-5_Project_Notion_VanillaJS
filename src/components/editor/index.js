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
          <input type="text" class='doc-title' name="title" value="${this.state.title}" readOnly />
          <div class='title-right-container'>
          <span id='is-saved'></span>
          <button class='editable-button'>수정하기</button>
          <button class='doc-delete-button'>삭제</button>
          </div>
        </div>
        <textarea name="content" style="width:100%; flex:1;" readOnly>${this.state.content}</textarea>
    `
    }

    $editor.querySelector(".doc-delete-button").addEventListener("click", async () => {
      await deleteDocument(this.state.id)
      $editor.querySelector(".doc-delete-button").style.display = "none"
      history.replaceState(null, null, "/")
      this.setState({ title: "", content: "" })
      renderApp()
    })

    $editor.querySelector(".editable-button").addEventListener("click", () => {
      $editor.querySelector("input[name=title]").readOnly = false
      $editor.querySelector("textarea[name=content]").readOnly = false

      if ($editor.querySelector(".editable-button").classList.contains("clicked")) {
        $editor.querySelector(".editable-button").classList.remove("clicked")
        $editor.querySelector(".editable-button").innerText = "수정하기"
      } else {
        $editor.querySelector(".editable-button").classList.add("clicked")
        $editor.querySelector(".editable-button").innerText = "수정완료"
      }
    })

    isInitialize = true
  }
  this.render()

  $editor.addEventListener("keyup", (e) => {
    const { target } = e
    const { name, value } = target

    this.setState({ ...this.state, [name]: value })
    if ($editor.querySelector(".editable-button").classList.contains("clicked")) {
      onEditing({ title: this.state.title, content: this.state.content })
    }
  })
}
