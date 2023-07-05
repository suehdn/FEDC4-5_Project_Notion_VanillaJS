import Button from "../../../components/ui/button"

import { createDocument } from "../../../api"

export default function NewParentDocButton({ $target, renderSideBar }) {
  const onClickNewDoc = async () => {
    await createDocument({ title: "새 문서", parentId: null })
    await renderSideBar()
  }

  this.render = () =>
    new Button({
      $target: $target,
      text: "새로운 문서 만들기",
      className: "new-parent-doc-button",
      onClick: onClickNewDoc,
    })

  this.render()
}
