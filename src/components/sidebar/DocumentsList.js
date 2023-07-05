import { documentsListTemplate } from '../../templates/mainPageTemplates'
import {
  addEventHandler,
  createComponent,
  removeEventHandler,
  handleSidebarClick,
} from '../../utils/domUtils'

export default function DocumentsList({
  $target,
  initialState,
  onClick,
  onAdd,
  onToggle,
  onDelete,
}) {
  const $documents = createComponent('div', {
    className: 'documents',
    parentElement: $target,
  })

  this.state = initialState

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
  }

  let clickListener = null

  this.render = () => {
    $documents.innerHTML = documentsListTemplate(this.state)

    if (clickListener) {
      removeEventHandler($documents, 'click', clickListener)
    }

    clickListener = ({ target }) => {
      handleSidebarClick(target, {
        onClick,
        onToggle,
        onAdd,
        onDelete,
      })
    }

    addEventHandler($documents, 'click', clickListener)
  }

  this.render()
}