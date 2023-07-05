import Editor from "../../components/editor"
import DocNext from "../../components/docNext"

import storage from "../../utils/storage"

import { updateDocument } from "../../api"

import { getDocumentsContent } from "../../api"

export default function MainContent({ $target, initialState = {}, renderApp }) {
  this.state = initialState
  let postLocalSaveKey = initialState.id ? `post-${initialState.id}` : "post-new"
  let timer = null

  this.render = () => {
    new Editor({
      $target,
      initialState: this.state,
      renderApp,
      onEditing: async (content) => {
        $target.querySelector("#is-saved").innerText = "저장되지 않음"
        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(async () => {
          clearTimeout(timer)
          storage.setItem(postLocalSaveKey, content)
          const { id } = this.state
          await updateDocument(id, content)
          $target.querySelector("#is-saved").innerText = "저장됨"
          renderApp()
        }, 2000)
      },
    })

    new DocNext({
      $target,
      initialState: this.state,
    })
  }

  this.setState = async (nextState) => {
    this.state = await getDocumentsContent(nextState.id)

    this.render()
  }

  this.render()
}
