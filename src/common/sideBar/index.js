import DocList from "../../components/docList"
import NewParentDocButton from "./section/newParentDocButton"
import SelectWorkSpaceButton from "./section/selectWorkSpaceButton"

import documentAdapter from "../../api/index"

export default function SideBar({ $target, loadDocument, renderApp }) {
  this.render = async () => {
    const docs = await documentAdapter.getDocuments()
    $target.innerHTML = ""
    new SelectWorkSpaceButton({ $target: $target, renderApp, loadDocument })
    new NewParentDocButton({
      $target: $target,
      renderSideBar: this.render,
      loadDocument,
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
