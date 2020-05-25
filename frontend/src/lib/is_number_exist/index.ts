export const checkIsNumberExist = (value: any) => {
  const isExist = typeof value !== 'undefined' || value !== null;
  const isNumberExist = isExist && typeof value === 'number';

  return isNumberExist;
};
