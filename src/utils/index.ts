import { useEffect, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
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

export const useDebounce = (value: any, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};
