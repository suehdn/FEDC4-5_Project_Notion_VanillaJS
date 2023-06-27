import { request } from '../utils/request';

export async function putDocument(documentId, { title, content }) {
  const document = await request(`documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
  });
  return document;
}
