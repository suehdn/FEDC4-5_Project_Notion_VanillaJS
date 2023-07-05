import Button from "../../ui/button"
import { createDocument } from "../../../api"

export default function newDocButton({ $target, parentId, renderSideBar }) {
  const onClickNewDoc = async () => {
    await createDocument({ title: "새 문서", parentId: parentId })
    await renderSideBar()
    history.pushState(null, null, `/documents/${parentId}`)
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
