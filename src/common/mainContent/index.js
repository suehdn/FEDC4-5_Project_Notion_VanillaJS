import Editor from "../../components/editor"
import DocNext from "../../components/docNext"

export default function MainContent({ $target, initialState = [] }) {
  this.render = () => {
    new Editor({
      $target,
      initialState,
    })

    new DocNext({
      $target,
      initialState,
    })
  }

  this.render()
}
