import CARET from '@consts/caret';

const savePosition = () => {
  const $caret = document.createElement('span');
  $caret.id = CARET.ID;

  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  range.insertNode($caret);

  const { focusNode } = selection;
  focusNode.blur();
};

const setPosition = () => {
  const $caret = document.getElementById(CARET.ID);

  if (!$caret) return;

  $caret.focus();

  const range = document.createRange();
  range.selectNode($caret);

  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  range.deleteContents();
};

const Caret = {
  savePosition,
  setPosition,
};

export default Caret;
