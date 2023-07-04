const API_END_POINT = "https://kdt-frontend.programmers.co.kr/documents";
const X_USERNAME = "noCheol";
const DEFAULT_HEADERS = { "x-username": X_USERNAME };

const request = async (url, opitons = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, { ...opitons, headers: { ...DEFAULT_HEADERS, "Content-Type": "application/json" } });
    if (res.ok) return await res.json();
    throw new Error("api 통신 중 이상");
  } catch (error) {
    console.log(error.message);
  }
};

export const getDocumentsTree = async () => {
  return await request();
};

export const getDocumentContent = async (url) => {
  return await request(url);
};
// 생성시 id 받아서 parent에 넣어준다.그리고 return으로 {id, title, createdAt, updataedAt}을 받는다.
export const createDocument = async (title, parentId = null) => {
  const bodyValue = JSON.stringify({ title, parent: parentId });
  const response = await request("", { method: "POST", body: bodyValue });
  return response;
};
// url에는 `/${id}` 같은 형식으로 들어올것이다.
export const updateDocument = async (url, value) => {
  const bodyValue = JSON.stringify(value);
  await request(url, { method: "PUT", body: bodyValue });
};

export const deleteDocument = async (url) => {
  await request(url, { method: "DELETE" });
};
