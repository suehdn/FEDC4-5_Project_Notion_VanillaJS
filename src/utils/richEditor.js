import { setCaret } from './cursor.js';

const selection = window.getSelection();

export const makeRichText = ($editor, key) => {
  const $parentNode = selection.anchorNode.parentNode;
  const $line = $parentNode.closest('.editor__line');
  const $anchorNode = selection.anchorNode;
  const text = $anchorNode.textContent;

  // 맨 첫 번째 노드이면 div로 감싸줌.
  if ($parentNode === $editor && $anchorNode.nodeType === Node.TEXT_NODE) {
    $parentNode.innerHTML = `<div class="editor__line">${text}</div>`;
    setCaret($parentNode.firstChild, 1);
  }

  if ($editor.innerHTML === '<br>') $editor.innerHTML = '';

  if (key === 'Enter' && $line) {
    const $newLine = document.createElement('div');
    $newLine.classList.add('editor__line');
    $newLine.innerHTML = '<br>';

    $parentNode.removeChild($parentNode.lastChild);

    const currentNode = [...$editor.childNodes].find((n) => n === $line);
    $editor.insertBefore($newLine, currentNode.nextSibling);
    setCaret($newLine.firstChild, 0);
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
