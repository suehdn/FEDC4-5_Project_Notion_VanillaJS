export function saveCursorPointer($content) {
  if (!$content) return;

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);

  let currentNode = range.startContainer;
  while (currentNode) {
    const nextNode = currentNode.parentNode;
    if (!nextNode || nextNode === $content) break;
    currentNode = nextNode;
  }

  const nodeIdx = Array.from($content.childNodes).findIndex((n) => n === currentNode);
  const offset = range.startOffset;
  return { nodeIdx, offset };
}

export function restoreCursorPointer($content, cursor) {
  if (!$content || !cursor) return;
  const { nodeIdx, offset } = cursor;

  let currentNode = $content.childNodes[nodeIdx];
  while (currentNode) {
    const nextNode = currentNode.firstChild;
    if (!nextNode) break;
    currentNode = nextNode;
  }

  const range = document.createRange();
  range.setStart(currentNode, offset);
  range.collapse(true);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
