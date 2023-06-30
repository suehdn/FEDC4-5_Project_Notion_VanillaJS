import { baseUrl, userName } from "../config/apiConfig"

export const apiClient = async (url, method, body) => {
  try {
    const reqBody = body ? JSON.stringify(body) : null
    const res = await fetch(
      `${baseUrl}${url}`,
      {
        method: method,
        headers: {
          "x-username": `${userName}`,
          "Content-Type": "application/json",
        },
      },
      reqBody,
    )
    if (res.ok) return await res.json()
    throw new Error(res.statusText)
  } catch (e) {
    console.error(e.message)
  }
}
