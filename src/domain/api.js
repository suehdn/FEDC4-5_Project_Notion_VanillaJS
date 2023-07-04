import { API_END_POINT, USERNAME, errorMessages } from '../constants';

// API 요청
export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${USERNAME}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    throw new Error(`${errorMessages.API_ERROR_MESSAGE} ${e.message}`);
  }
};
