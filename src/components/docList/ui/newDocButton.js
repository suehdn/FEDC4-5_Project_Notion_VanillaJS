import Button from "../../ui/button"
import { createDocument } from "../../../api"

export default function newDocButton({ $target, parentId }) {
  const onClickNewDoc = async () => {
    await createDocument({ title: "제목", parentId: parentId })
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
