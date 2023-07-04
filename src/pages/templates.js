const template = (function () {
  const colorListItem = ({ name, color, backgroundColor }) => `
    <li
      class="main__text-style-menu--list-item"
      data-role="applyTextStyle"
      data-color="${color}"
      data-background-color="${backgroundColor}"
      style="color: ${color};"
    >
      <span class="main__text-style-menu--preview" style="background-color: ${backgroundColor};">A</span>
      <span class="main__text-style-menu--word">${name}</span>
    </li>
  `;

  const colorList = ({ colors = [], title = '' }) => `
    <div class="main__text-style-menu--title">${title}</div>
    <ul class="main__text-style-menu--list">
      ${colors.map(colorListItem).join('')}
    </ul>
  `;

  return { colorList };
})();

export default template;
