export const getCurrentDate = () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}_${date.getMonth() +
    1}_${date.getDay()}`;

  return currentDate;
};
