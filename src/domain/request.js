import { requestWithErrorHandle } from '../utils/requestWithErrorHandle';
import { RouteService } from '../utils/RouteService';

export function request(url, option) {
  return requestWithErrorHandle(
    `${import.meta.env.VITE_API_END_POINT}/${url}`,
    {
      ...option,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${import.meta.env.VITE_X_USERNAME}`,
      },
    },
    () => {
      if (confirm(`존재하지 않는 페이지 입니다.`)) {
        const router = new RouteService();
        router.replace('/');
      }
    },
  );
}
