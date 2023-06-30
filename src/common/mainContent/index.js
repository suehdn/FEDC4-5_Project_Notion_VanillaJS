import Editor from "../../components/editor"
import DocNext from "../../components/docNext"

export default function MainContent({ $target, initialState = {} }) {
  this.state = initialState

  this.render = () => {
    new Editor({
      $target,
      initialState: this.state,
    })

    new DocNext({
      $target,
      initialState: this.state,
    })
  }

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  this.render()
}
