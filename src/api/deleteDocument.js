import { request } from '../utils/request';

export async function deleteDocument(documentId) {
  const document = await request(`documents/${documentId}`, {
    method: 'DELETE',
  });
  return document;
}
