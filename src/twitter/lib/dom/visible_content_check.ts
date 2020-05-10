export const checkIsTwitterContentVisible = (loaderSelector: string) => {
  const loaderNode = document.querySelector(loaderSelector);
  const isTweetsAvailable = loaderNode === null;

  return isTweetsAvailable;
};
