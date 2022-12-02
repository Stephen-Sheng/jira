import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const cleanObject = (obj: Object) => {
  let result = { ...obj };
  Reflect.ownKeys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      Reflect.deleteProperty(result, key);
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 泛型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
export type UserArr = { name: string; age: number };

export const useArray = <T>(value: T[]) => {
  const [arr, setArr] = useState(value);
  function add(obj: T) {
    setArr([...arr, obj]);
  }
  function clear() {
    setArr([]);
  }
  function removeIndex(index: number) {
    let newArr = arr.filter((val, idx) => idx !== index);
    setArr(newArr);
  }
  return { value: arr, add, clear, removeIndex };
};
