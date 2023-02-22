import { useState } from "react";

/**
 * A custom React hook that allows values to be stored in local storage
 * @param {string} key - The key to use for storing the value in local storage
 * @param {any} initValue - The initial value to use if the value has not been set previously
 * @returns {[any, function]} A tuple containing the stored value and a function to update the stored value
 */

function useLocalStorage(key, initValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initValue;
    } catch (error) {
      console.log(error);
      return initValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export default useLocalStorage;
