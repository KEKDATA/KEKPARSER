export const getTextOfChildNodes = (parentNode: Cheerio) => {
  const childElements: Cheerio = parentNode.children();
  const texts: Array<string> = [];

  for (let i = 0; i < childElements.length; i++) {
    const childElement = childElements.eq(i);

    if (!childElement) {
      break;
    }

    texts.push(childElement.text());
  }

  return texts;
};
