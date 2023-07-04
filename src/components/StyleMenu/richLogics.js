export const applyTextStyle = ({ color, backgroundColor }) => {
  document.execCommand('foreColor', false, color || 'inherit');
  document.execCommand('backColor', false, backgroundColor || 'inherit');
};

export const toggleTextStyleMenu = ({ $textMenu }) => {
  if ($textMenu.classList.contains('hidden')) $textMenu.classList.remove('hidden');
  else $textMenu.classList.add('hidden');
};
