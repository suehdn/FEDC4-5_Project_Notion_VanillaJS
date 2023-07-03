const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'x-username': 'wukddang' },
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 호출에 실패했습니다.');
  } catch (e) {
    alert(e.message);
    return null;
  }
};

export default request;
