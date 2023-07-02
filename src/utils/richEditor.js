import { setCaret } from './cursor.js';

const selection = window.getSelection();

const findDeepFirstChild = ($node) => {
  let currentNode = $node;

  while (currentNode) {
    const nextNode = currentNode.firstChild;
    if (!nextNode) break;
    currentNode = nextNode;
  }

  return currentNode;
};

const isHeading = ($node) =>
  $node.classList.contains('editor__h1') ||
  $node.classList.contains('editor__h2') ||
  $node.classList.contains('editor__h3');

const removeHeading = ($node) => {
  $node.classList.remove('editor__h1');
  $node.classList.remove('editor__h2');
  $node.classList.remove('editor__h3');
};

export const makeRichText = ($editor, key) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $line = $parentNode.closest('.editor__line');
  const $anchorNode = selection.anchorNode;
  const text = $anchorNode.textContent;

  // 첫 번째 줄에서 텍스트를 입력한 경우 div 요소로 감싸줌
  if ($parentNode === $editor && $anchorNode.nodeType === Node.TEXT_NODE) {
    $parentNode.innerHTML = `<div class="editor__line">${text}</div>`;
    setCaret($parentNode.firstChild, 1);
  }

  // 에디터가 비어있으면 내용 초기화
  if ($editor.innerHTML === '<br>') $editor.innerHTML = '';

  // 헤딩 속성 지정
  if (key === ' ' && $line) {

    if (text.startsWith('### ')) {
      const nextHtml = $parentNode.innerHTML.substring(4) || '<br>';
      removeHeading($line);
      $line.classList.add('editor__h3');
      $line.innerHTML = nextHtml;
      const $child = findDeepFirstChild($line);
      setCaret($child, 0);
    } else if (text.startsWith('## ')) {
      const nextHtml = $parentNode.innerHTML.substring(3) || '<br>';
      removeHeading($line);
      $line.classList.add('editor__h2');
      $line.innerHTML = nextHtml;
      const $child = findDeepFirstChild($line);
      setCaret($child, 0);
    } else if (text.startsWith('# ')) {
      const nextHtml = $parentNode.innerHTML.substring(2) || '<br>';
      removeHeading($line);
      $line.classList.add('editor__h1');
      $line.innerHTML = nextHtml;
      const $child = findDeepFirstChild($line);
      setCaret($child, 0);
    }
  }
};

export const handleNewLine = ($editor, event) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $anchorNode = selection.anchorNode;
  const $line = $parentNode.closest('.editor__line');

  // 비어있는 상태에서 개행하는 경우
  if ($anchorNode === $editor) {
    event.preventDefault();
    $anchorNode.innerHTML = `<div class="editor__line"><br/></div><div class="editor__line"><br/></div>`;
    setCaret($anchorNode.lastChild, 0);
    return;
  }

  if ($line) {
    // headings 태그에서 개행하는 경우
    if (isHeading($line)) {
      setTimeout(() => {
        $line.nextSibling.className = 'editor__line';
      }, 0);
    }

    // 개행된 라인의 텍스트가 비어 있으면 모든 스타일 초기화
    setTimeout(() => {
      const $previousLine = $line.previousSibling;
      const $previousChild = findDeepFirstChild($previousLine);
      if ($previousChild && $previousChild.nodeType !== Node.TEXT_NODE) $previousLine.innerHTML = '<br>';

      const $nextLine = $line.nextSibling;
      const $nextChild = findDeepFirstChild($nextLine);
      if ($nextChild && $nextChild.nodeType !== Node.TEXT_NODE) $nextLine.innerHTML = '<br>';
    }, 0);
  }
};

export const handleBackspace = ($editor, event) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $heading = $parentNode.closest('.editor__h1, .editor__h2, .editor__h3');

  // headings 태그의 시작 위치에서 백스페이스를 누른 경우
  if ($heading && selection.anchorOffset === 0) {
    event.preventDefault();
    removeHeading($heading);
  }
};
