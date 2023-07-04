import validateComponent from '../utils/validateComponent';

export default function DocumentTree({ targetElement, childDocuments, invisibleTreeSet, foldedTreeSet }) {
  validateComponent(this, DocumentTree);
  this.init = () => {
    this.targetElement = targetElement;
    this.render();
  };

  this.render = () => {
    targetElement.innerHTML += `
      ${childDocuments
        .map(({ id, title }) => {
          return `
            <div class="document-tree" data-id="${id}" 
              style="margin-left: ${15}px; display: ${invisibleTreeSet.has(id) ? 'none' : 'block'}"
            >
              <span class="document-blob">
                <span class="document-toggle">
                  ${foldedTreeSet.has(id) ? '>' : 'v'}
                </span>
                <span class="document-blob-title">${title === '' ? '제목없음' : title}</span>
                <span class="new-document-btn">+</span>
                <span class="delete-document-btn">삭제</span>
              </span>
            </div>
          `;
        })
        .join('')}
    `;

    childDocuments.forEach(({ id, documents }) => {
      new DocumentTree({
        targetElement: targetElement.querySelector(`[data-id="${id}"]`),
        childDocuments: documents,
        invisibleTreeSet,
        foldedTreeSet,
      });
    });
  };

  this.init();
}
