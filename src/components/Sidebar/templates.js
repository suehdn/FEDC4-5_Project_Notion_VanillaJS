import { documentSvg, trashSvg, plusSvg } from '../../utils/svgTemplates.js';

const template = (function () {
  const documentList = (list, depth) => `
    <ul class="sidebar__document-list">
      ${list.map((item) => documentListItem(item, depth)).join('')}
    </ul>
  `;

  const documentListItem = ({ id, title, documents, createdAt, updateAt }, depth) => `
    <li class="sidebar__document-item" data-id="${id}">
      <div class="sidebar__document" data-role="navigate" style="padding-left: ${0.5 + 1 * depth}em;">
        <div class="sidebar__document-svg">${documentSvg()}</div>
        <div class="sidebar__document--title">${title}</div>
        <section class="sidebar__document--action-section">
          <div data-role="remove">${trashSvg()}</div>
          <div data-role="append">${plusSvg()}</div>
        </section>
      </div>
      ${documents.length > 0 ? documentList(documents, depth + 1) : ''}
    </li>
  `;

  return { documentList, documentListItem };
})();

export default template;
