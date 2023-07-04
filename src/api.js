export const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";

export const getApi = async (username, id = "") => {
  try {
    const res = await fetch(`${API_END_POINT}/${id}`, {
      headers: {
        "x-username": username,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error("API 처리 중 무엇인가 이상합니당!");
  } catch (e) {
    alert(e.message);
  }
};
