const selection = window.getSelection();

export const setCaret = ($textNode, offset) => {
  const range = document.createRange();
  range.setStart($textNode, offset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
};
