import { useState, useEffect } from "react";

export function useLocalStorage<T>(keys: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(keys);
    if (jsonValue === null) {
      if (typeof initialValue === "function") {
        return (initialValue as () => T)();
      } else {
        return initialValue;
      }
    } else {
      return JSON.parse(jsonValue);
    }
  });
  useEffect(() => {
    localStorage.setItem(keys, JSON.stringify(value));
  }, [value, keys]);

  return [value, setValue] as [T, typeof setValue];
}
