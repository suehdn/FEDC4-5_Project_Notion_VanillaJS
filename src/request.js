const DEFAULT_ENDPOINT = 'https://kdt-frontend.programmers.co.kr/documents'

export default reqeust = async(url, options) => {
    try{
        const res = await fetch(`${DEFAULT_ENDPOINT}${url}`, {
            ...options,
            headers: {
                'x-username': '다른 사람과 겹치지 않는 고유한 이름'
            }
        })
    } 
    catch(e){
        
    }
}