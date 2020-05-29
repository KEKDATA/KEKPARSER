export const checkIsLink = (link: string | undefined) => {
  if (!link) {
    return false;
  }

  const isLink = /(https?:\/\/[^\s]+)/g.test(link);
  return isLink;
};
