export const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'X-Username': 'jonghyun',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) return await res.json();

    throw new Error('API에 문제가 있습니다.');
  } catch (e) {
    console.log(e.message);
  }
};
