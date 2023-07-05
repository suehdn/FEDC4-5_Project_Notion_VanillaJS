export function findDocumentPath(documents, documentId, path = []) {
  for (const document of documents) {
    if (document.id === documentId) {
      return [...path, document.id];
    }
    if (document.documents?.length > 0) {
      const nestedPath = findDocumentPath(document.documents, documentId, [...path, document.id]);
      if (nestedPath) {
        return nestedPath;
      }
    }
  }
  return null;
}
