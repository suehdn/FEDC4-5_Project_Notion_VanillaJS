const storage = (function (storage) {
  const setItem = (key, value) => {
    try {
      storage.setItem(key, value)
    } catch (error) {
      console.error(error)
    }
  }

  const getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key)

      if (storedValue) {
        return JSON.parse(storedValue)
      }
      return defaultValue
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  }

  return {
    setItem,
    getItem,
  }
})(window.localStorage)

export default storage
