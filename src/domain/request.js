import { requestWithErrorHandle } from '../utils/requestWithErrorHandle';

const API_ENTRY = 'https://kdt-frontend.programmers.co.kr';

export function request(url, option) {
  return requestWithErrorHandle(`${API_ENTRY}/${url}`, {
    ...option,
    headers: {
      'Content-Type': 'application/json',
      'x-username': 'wlqrpfldk',
    },
  });
}
