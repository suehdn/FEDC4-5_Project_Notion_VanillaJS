import Editor from "../../components/editor"
import DocNext from "../../components/docNext"

import { getDocumentsContent } from "../../api"

export default function MainContent({ $target, initialState = {}, renderApp }) {
  this.state = initialState

  this.render = () => {
    new Editor({
      $target,
      initialState: this.state,
      renderApp,
    })

    new DocNext({
      $target,
      initialState: this.state,
    })
  }

  this.setState = async (nextState) => {
    this.state = await getDocumentsContent(nextState.id)
    console.log(this.state)
    this.render()
  }

  this.render()
}
