export const isFalsy = (value) => (value === 0 ? false : !value);
export const cleanObject = (obj) => {
  let result = { ...obj };
  Reflect.ownKeys(result).forEach((key) => {
    const value = obj[key];
    if (isFalsy(value)) {
      Reflect.deleteProperty(result, key);
    }
  });
  return result;
};
