import { request } from '../utils/request';

export async function getDocument(documentId) {
  const document = await request(`documents/${documentId}`, {
    method: 'GET',
  });
  return document;
}
