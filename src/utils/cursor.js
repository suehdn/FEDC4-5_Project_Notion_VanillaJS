const selection = window.getSelection();

export const setCaret = ($textNode, offset) => {
  const range = document.createRange();
  range.setStart($textNode, offset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}

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

// innerHTML로 아예 노드를 새로 바꿔버리니깐 기존의 노드에 접근할 방법이 없음.
// restore에서 어떻게 작업해줘야할까?
// => 노드가 깊어지면 커서를 위치하려는 정확한 텍스트 노드를 찾기가 굉장히 어려움.
// => 그냥 input 이벤트 발생할 때마다 innerHTML을 수정하지는 말고, 서버나 스토리지에 업데이트하는 로직만 수행하는게 좋을지도.