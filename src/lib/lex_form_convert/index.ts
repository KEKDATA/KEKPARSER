import { dictionary } from './dictionary';

export const aposToLexForm = (text: string) => {
  const textWithWordBreak = text.split(' ');

  for (let wordIndex = 0; wordIndex < textWithWordBreak.length; wordIndex++) {
    let currentWord = textWithWordBreak[wordIndex];

    const isWordIncludesApostrophe = currentWord.includes('’');
    if (isWordIncludesApostrophe) {
      currentWord = currentWord.replace('’', "'");
    }

    const arrayOfDictionary = Object.keys(dictionary);

    for (
      let apostropheIndex = 0;
      apostropheIndex < arrayOfDictionary.length;
      apostropheIndex++
    ) {
      const apostrophe = arrayOfDictionary[apostropheIndex];

      if (apostrophe === currentWord.toLowerCase()) {
        textWithWordBreak[wordIndex] = dictionary[apostrophe];
      }
    }
  }

  return textWithWordBreak.join(' ');
};
