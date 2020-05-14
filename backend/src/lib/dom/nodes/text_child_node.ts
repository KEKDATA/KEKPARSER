export const getTextOfChildNode = (parentNode: Cheerio, childNode: string) =>
  parentNode.find(childNode).text();
