import { request } from "./api.js"

//document를 삭제합니다
export const deleteDocument = async(id)=>{
    await request(`/documents/${id}`, {
        method : "DELETE"
    })
    
}

//하위document 또는 상위document를 생성합니다
export const postDocument = async (id)=>{
    if(id){
        return await request("/documents", { 
            method : "POST",
            body : JSON.stringify({
                title : "제목 없음",
                parent : `${id}`
            })
        })
    }else{
        return await request("/documents", { 
            method : "POST",
            body : JSON.stringify({
                title : "",
                parent : ""
            })
        })
    }
}

//document를 수정합니다.
export const putDocument = async(document)=>{
    return await request(`/documents/${document.id}`, {
        method : "PUT",
        body : JSON.stringify({
            title : document.title,
            content : document.content
        })
    })
}

//특정 document를 불러옵니다.
export const fetchEditor = async(documentId)=>{
    const lists = await fetchDocumentLists()
    const find = findDocument(lists, documentId)
    if(find){ //뒤로가기 했을때 삭제한 페이지의 api요청 오류를 방지합니다.
        const document = await request(`/documents/${documentId}`)
        return document
    }
}

//전체 document를 불러옵니다.
export const fetchDocumentLists = async() =>{
    const lists = await request("/documents")
    return lists
}

const findDocument = (lists, documentId) =>{
    return lists.find(({id,documents})=> id == documentId ? id : findDocument(documents,documentId))
}