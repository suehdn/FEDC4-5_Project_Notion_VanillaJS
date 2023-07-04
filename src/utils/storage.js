const storage = window.localStorage;

export const getLocalItem = (key, defaultValue) => {
  try {
    const storedValue = storage.getItem(key);

    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (e) {
    console.log(e.massage);
    return defaultValue;
  }
};
export const setLocalItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeLocalItem = (key) => {
  storage.removeItem(key);
};
