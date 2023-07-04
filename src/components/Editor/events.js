import { makeRichText } from '../../utils/richEditor.js';
import { handleNewLine, handleBackspace } from '../../utils/richEditor.js';

const selection = window.getSelection();

export const handlePreventNewLine = (e) => {
  if (e.key === 'Enter') e.preventDefault();
};

export const handleCursorToContent = (e, { $content }) => {
  $content.focus();
};

export const handleRichText = (e, { $content }) => {
  if (e.isComposing) return;
  makeRichText($content, e.key);
};

export const handleKeyDown = (e, { $content }) => {
  if (e.key === 'Enter') handleNewLine($content, e); // 개행 처리
  if (e.key === 'Backspace') handleBackspace($content, e); // 백스페이스 처리
};

export const handleChangeInput = (e, { onChange }) => {
  const role = e.target.dataset.role;
  if (!role || !['title', 'content'].includes(role)) return;

  setTimeout(() => {
    onChange({ name: role, value: e.target.innerHTML });
  }, 100);
};

export const handleShowStyleMenu = (e) => {
  setTimeout(() => {
    if (selection.toString().trim().length === 0) return;

    console.log(selection.toString());
  }, 0);
};