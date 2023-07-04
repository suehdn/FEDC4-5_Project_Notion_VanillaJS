import { applyRichContent, toggleStyleMenu, onBackspace, onEnter } from './richLogics.js';

export const handlePreventNewLine = (e) => {
  if (e.key === 'Enter') e.preventDefault();
};

export const handleCursorToContent = (e, { $content }) => {
  if (e.key !== 'Enter') return;
  $content.focus();
};

export const handleRichContent = (e, { $content }) => {
  if (e.isComposing) return;
  applyRichContent({ $editor: $content, key: e.key });
};

export const handleKeyDown = (e, { $content }) => {
  if (e.key === 'Enter') onEnter(e, { $editor: $content }); // 개행 처리
  else if (e.key === 'Backspace') onBackspace(e, { $editor: $content }); // 백스페이스 처리
};

export const handleChangeInput = (e, { onChange }) => {
  const role = e.target.dataset.role;
  if (!role || !['title', 'content'].includes(role)) return;

  setTimeout(() => {
    onChange({ name: role, value: e.target.innerHTML });
  }, 100);
};

export const handleShowStyleMenu = (e, { $menu }) => {
  setTimeout(() => {
    toggleStyleMenu(e, { $menu });
  }, 0);
};

export const handleStyleAction = (e, { $menu }) => {
  const command = e.target.closest('[data-command]')?.dataset.command;
  if (command) document.execCommand(command, false, null);
};
