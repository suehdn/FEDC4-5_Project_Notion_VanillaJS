import DocList from "../../components/docList"
import NewParentDocButton from "./section/newParentDocButton"

import { getDocuments } from "../../api"

export default function SideBar({ $target, loadDocument }) {
  this.render = async () => {
    const docs = await getDocuments()
    $target.innerHTML = ""
    new NewParentDocButton({
      $target: $target,
      renderSideBar: this.render,
    })
    new DocList({
      $target: $target,
      initialState: docs,
      renderSideBar: this.render,
      loadDocument,
    })
  }

  this.render()
}
