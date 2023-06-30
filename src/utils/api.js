const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

const DEFAULT_OPTION = {
  headers: {
    'Content-Type': 'application/json',
    'x-username': 'roto',
  },
};

const request = async (url, options = {}) => {
  const data = await fetch(`${API_END_POINT}${url}`, {
    ...options,
    ...DEFAULT_OPTION,
  })
    .then((response) => {
      if (!response.ok) throw new Error('API request error');

      return response.json();
    })
    .catch((e) => {
      console.error(e);
    });

  return data;
};

export default request;
