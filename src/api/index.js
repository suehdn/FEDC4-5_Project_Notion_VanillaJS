import { apiClient } from "../utils/api"

async function getDocuments() {
  return await apiClient("/documents", "GET")
}

async function getDocumentsContent(id) {
  return await apiClient(`/documents/${id}`, "GET")
}

async function createDocument({ title, parentId }) {
  return await apiClient("/documents", "POST", { title: title, parent: parentId })
}

async function updateDocument(id, { title, content }) {
  return await apiClient(`/documents/${id}`, "PUT", { title: title, content: content })
}

async function deleteDocument(id) {
  return await apiClient(`/documents/${id}`, "DELETE")
}

export { getDocuments, getDocumentsContent, createDocument, updateDocument, deleteDocument }
