import { ERROR, RequestError } from "./Errors";

const API_END_POINT = "https://kdt-frontend.programmers.co.kr";

async function request(url, options = {}) {
  if (url[0] !== "/") {
    url = "/" + url;
  }

  try {
    const response = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "howon",
      },
    });

    if (!response.ok) {
      throw new RequestError(ERROR.INVALID_REQUEST);
    }

    return response.json();
  } catch (err) {
    alert(err.message);
  }
}

export async function getRootDocuments() {
  return await request("/documents");
}
