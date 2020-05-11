export const getTextWithAlphaOnly = (text: string) => {
  const textWithAlphaOnly = text.replace(/[^a-zA-Z\s]+/g, '');

  return textWithAlphaOnly;
};
