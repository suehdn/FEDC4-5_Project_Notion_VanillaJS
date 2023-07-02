import { setCaret } from './cursor.js';

const selection = window.getSelection();

export const makeRichText = ($editor, key) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $line = $parentNode.closest('.editor__line');
  const $anchorNode = selection.anchorNode;
  const text = $anchorNode.textContent;

  // 첫 번째 줄에서 입력한 경우 div 요소로 감싸줌
  if ($parentNode === $editor) {
    if ($anchorNode.nodeType === Node.TEXT_NODE) {
      // 텍스트 입력한 경우
      $parentNode.innerHTML = `<div class="editor__line">${text}</div>`;
      setCaret($parentNode.firstChild, 1);
    } else if (!$parentNode.firstChild.classList.contains('editor__line')) {
      // 비어있는 상태에서 개행해서 클래스가 없는 div 요소가 두 개 생성된 경우
      $parentNode.innerHTML = `<div class="editor__line"><br/></div><div class="editor__line"><br/></div>`;
      setCaret($parentNode.lastChild, 0);
    }
  }

  if ($editor.innerHTML === '<br>') $editor.innerHTML = '';

  // headings 태그에서 개행한 경우 다음 줄로 넘어가기
  if (key === 'Enter') {
    console.log($anchorNode);
    if ($line) {
      const $newLine = document.createElement('div');
      $newLine.classList.add('editor__line');
      $newLine.innerHTML = '<br>';

      $parentNode.removeChild($parentNode.lastChild);

      const currentNode = [...$editor.childNodes].find((n) => n === $line);
      $editor.insertBefore($newLine, currentNode.nextSibling);
      setCaret($newLine.firstChild, 0);
    }
  }

  if (key === ' ' && $line) {
    if (text.startsWith('### ')) {
      const newText = text.substring(4) || '<br>';
      $line.innerHTML = `<h3>${newText}</h3>`;
    } else if (text.startsWith('## ')) {
      const newText = text.substring(3) || '<br>';
      $line.innerHTML = `<h2>${newText}</h2>`;
    } else if (text.startsWith('# ')) {
      const newText = text.substring(2) || '<br>';
      $line.innerHTML = `<h1>${newText}</h1>`;
    }
  }
};
