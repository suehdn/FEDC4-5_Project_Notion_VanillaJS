import DocList from "../../components/docList"

export default function SideBar({ $target, initialState = [] }) {
  this.render = () => {
    new DocList({
      $target,
      initialState,
    })
  }

  this.render()
}
