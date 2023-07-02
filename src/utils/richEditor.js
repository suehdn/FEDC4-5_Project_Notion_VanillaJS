import { setCaret } from './cursor.js';

const selection = window.getSelection();

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
      $line.classList.add('editor__h3');
      $line.classList.remove('editor__h2');
      $line.classList.remove('editor__h1');
      $line.innerHTML = nextHtml;
    } else if (text.startsWith('## ')) {
      const nextHtml = $parentNode.innerHTML.substring(3) || '<br>';
      $line.classList.remove('editor__h3');
      $line.classList.add('editor__h2');
      $line.classList.remove('editor__h1');
      $line.innerHTML = nextHtml;
    } else if (text.startsWith('# ')) {
      const nextHtml = $parentNode.innerHTML.substring(2) || '<br>';
      $line.classList.remove('editor__h3');
      $line.classList.remove('editor__h2');
      $line.classList.add('editor__h1');
      $line.innerHTML = nextHtml;
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

  // headings 태그에서 개행하는 경우
  if ($line) {
    if (
      $line.classList.contains('editor__h1') ||
      $line.classList.contains('editor__h2') ||
      $line.classList.contains('editor__h3')
    ) {
      setTimeout(() => {
        $line.nextSibling.className = 'editor__line';
      }, 0);
    }
  }
};
