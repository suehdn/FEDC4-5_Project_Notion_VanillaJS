import { applyRichContent, onBackspace, onEnter } from './richLogics.js';

const selection = window.getSelection();

export const handlePreventNewLine = (e) => {
  if (e.key === 'Enter') e.preventDefault();
};

export const handleCursorToContent = (e, { $content }) => {
  $content.focus();
};

export const handleRichContent = (e, { $content }) => {
  if (e.isComposing) return;
  applyRichContent($content, e.key);
};

export const handleKeyDown = (e, { $content }) => {
  if (e.key === 'Enter') onEnter(e, { $editor: $content }); // 개행 처리
  if (e.key === 'Backspace') onBackspace(e, { $editor: $content }); // 백스페이스 처리
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
