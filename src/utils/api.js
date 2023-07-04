const API_END_POINT = "https://kdt-frontend.programmers.co.kr";
const X_USERNAME = "noCheol";
const DEFAULT_HEADERS = { "x-username": X_USERNAME };

const request = async (url, opitons = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, { ...opitons, headers: { ...DEFAULT_HEADERS, "Content-Type": "application/json" } });
    if (res.ok) return await res.json();
    throw new Error("api 통신 중 이상");
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const getDocumentsTree = async () => {
  return await request("/documents");
};

export const getDocumentContent = async (url) => {
  return await request(url);
};

export const createDocument = async () => {};

export const updateDocument = async () => {};

export const deleteDocument = async () => {};
