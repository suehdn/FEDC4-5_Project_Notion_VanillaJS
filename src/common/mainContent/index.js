import Editor from "../../components/editor"
import DocNext from "../../components/docNext"

import { updateDocument } from "../../api"

import { getDocumentsContent } from "../../api"

export default function MainContent({ $target, initialState = {}, renderApp, routeApp }) {
  this.state = initialState
  let timer = null

  this.render = () => {
    new Editor({
      $target,
      initialState: this.state,
      renderApp,
      routeApp,
      onEditing: async (content) => {
        $target.querySelector("#is-saved").classList.remove("saved")
        $target.querySelector("#is-saved").innerText = "저장되지 않음"
        $target.querySelector("#is-saved").classList.add("not-saved")

        if (timer !== null) {
          clearTimeout(timer)
        }
        timer = setTimeout(async () => {
          clearTimeout(timer)
          const { id } = this.state
          await updateDocument(id, content)
          $target.querySelector("#is-saved").classList.remove("not-saved")
          $target.querySelector("#is-saved").innerText = "저장됨"
          $target.querySelector("#is-saved").classList.add("saved")
          renderApp()
        }, 1000)
      },
    })

    // new DocNext({
    //   $target,
    //   initialState: this.state,
    // })
  }

  this.setState = async (nextState) => {
    this.state = await getDocumentsContent(nextState.id)

    this.render()
  }

  this.render()
}
