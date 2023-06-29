import { documentSvg, trashSvg, plusSvg, chevronRightSvg } from '../../utils/svgTemplates.js';

const template = (function () {
  const documentList = ({ documents, depth, currentDocumentId }) => `
    <ul class="sidebar__document-list">
      ${documents.map((document) => documentListItem({ document, depth, currentDocumentId })).join('')}
    </ul>
  `;

  const documentListItem = ({ document: { id, title, documents, createdAt, updateAt }, depth, currentDocumentId }) => `
    <li class="sidebar__document-item" data-id="${id}">
      <div
        class="${
          'sidebar__document' +
          (currentDocumentId === id ? ' active' : '')
        }"
        data-role="navigate"
        style="padding-left: ${0.5 + 1 * depth}em;"
      >
        <div class="sidebar__icon" data-role="open">${chevronRightSvg()}</div>
        <div class="sidebar__document-svg">${documentSvg()}</div>
        <div class="sidebar__document--title">${title}</div>
        <section class="sidebar__document--action-section">
          <div class="sidebar__icon" data-role="remove">${trashSvg()}</div>
          <div class="sidebar__icon" data-role="append">${plusSvg()}</div>
        </section>
      </div>
      ${documents.length > 0 ? documentList({ documents, depth: depth + 1, currentDocumentId }) : ''}
    </li>
  `;

  return { documentList, documentListItem };
})();

export default template;
