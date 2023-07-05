import { deleteDocument } from "../../api"

export default function Editor({ $target, initialState = {}, onEditing, renderApp, routeApp }) {
  this.state = initialState
  const $editor = document.createElement("div")
  let isInitialize = false
  $editor.className = "editor"
  $target.querySelector(".editor")
    ? $target.replaceChild($editor, $target.querySelector(".editor"))
    : $target.appendChild($editor)

  this.setState = (nextState) => {
    this.state = nextState
    $editor.querySelector("input[name=title]").value = this.state.title
    $editor.querySelector("textarea[name=content]").value = this.state.content

    this.render()
  }

  this.render = () => {
    if (!isInitialize) {
      $editor.innerHTML = `
        <div class='doc-nav'>
          <input type="text" class='doc-title' name="title" value="${this.state.title ?? ""}" readOnly />
          <div class='title-right-container'>
          <span id='is-saved'></span>
          <button class='editable-button'>수정하기</button>
          <button class='doc-delete-button'>삭제</button>
          </div>
        </div>
        <textarea name="content" style="width:100%; flex:1;" readOnly>${this.state.content ?? ""}</textarea>
    `
      isInitialize = true
    }
  }
  this.render()

  $editor.querySelector(".doc-delete-button").addEventListener("click", async () => {
    await deleteDocument(this.state.id)
    $editor.querySelector(".doc-delete-button").style.display = "none"
    history.replaceState(null, null, "/")
    this.setState({ title: "", content: "" })
    renderApp()
    routeApp()
  })

  $editor.querySelector(".editable-button").addEventListener("click", () => {
    if ($editor.querySelector(".editable-button").classList.contains("clicked")) {
      $editor.querySelector(".editable-button").classList.remove("clicked")
      $editor.querySelector(".editable-button").innerText = "수정하기"
      $editor.querySelector("input[name=title]").readOnly = true
      $editor.querySelector("textarea[name=content]").readOnly = true
    } else {
      $editor.querySelector(".editable-button").classList.add("clicked")
      $editor.querySelector(".editable-button").innerText = "수정완료"
      $editor.querySelector("input[name=title]").readOnly = false
      $editor.querySelector("textarea[name=content]").readOnly = false
      $editor.querySelector("#is-saved").classList.remove("saved")
      $editor.querySelector("#is-saved").innerText = "저장되지 않음"
      $editor.querySelector("#is-saved").classList.add("not-saved")
    }
  })

  $editor.addEventListener("keyup", async (e) => {
    const { target } = e
    const { name, value } = target

    this.setState({ ...this.state, [name]: value })
    console.log("editing")
    if ($editor.querySelector(".editable-button").classList.contains("clicked")) {
      console.log(this.state)
      await onEditing({ title: this.state.title, content: this.state.content })
    }
  })
}
