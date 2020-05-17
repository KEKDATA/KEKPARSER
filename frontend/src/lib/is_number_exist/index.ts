export const checkIsNumberExist = (value: number) => {
  const isExist = typeof value !== 'undefined' || value !== null;
  const isNumberExist = isExist && typeof value === 'number';

  return isNumberExist;
};
