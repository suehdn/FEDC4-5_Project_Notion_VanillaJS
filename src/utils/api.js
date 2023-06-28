import { baseUrl, userName } from "../config/apiConfig"

export const apiClient = (url, method, body) => {
  return (
    fetch(`${baseUrl}${url}`, {
      method: method,
      headers: {
        "x-username": `${userName}`,
        "Content-Type": "application/json",
      },
    }),
    body ? JSON.stringify(body) : null
  )
}
