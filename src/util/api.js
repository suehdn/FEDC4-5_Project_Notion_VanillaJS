const API_ENDPOINT = 'https://kdt-frontend.programmers.co.kr/documents';

export const fetchAPI = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_ENDPOINT}${url}`, {
      headers: {
        ...options,
        'x-username': 'roto',
      },
    });
    if (res.ok) {
      return res.json();
    }
  } catch (err) {
    console.log(err);
  }
};
