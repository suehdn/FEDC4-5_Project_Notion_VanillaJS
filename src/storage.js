const storage = window.localStorage 

export const setItem = (key, value) => {
    try {
        storage.setItem(key, value)
    } catch(e) {
        throw new Error(e)
    }
}
export const getItem = (key, defaultValue = {}) => {
    try {
        const storedValue = storage.getItem(key);
        if (storedValue){
            return JSON.parse(storedValue);
        }
        return defaultValue;
    } catch(e) {
        throw new Error("저장공간이 잘못되었습니다.")
    }
}
export const removeItem = (key) => {
    storage.removeItem(key);
}