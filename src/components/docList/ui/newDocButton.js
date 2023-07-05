import Button from "../../ui/button"
import { createDocument } from "../../../api"

export default function newDocButton({ $target, parentId, renderSideBar, loadDocument }) {
  const onClickNewDoc = async () => {
    const res = await createDocument({ title: "새 문서", parentId: parentId })
    await renderSideBar()
    await loadDocument()
    history.pushState(null, null, `/documents/${res.id}`)
  }

  this.render = () =>
    new Button({
      $target: $target,
      text: "+",
      className: "make-document-button",
      onClick: onClickNewDoc,
    })

  this.render()
}
