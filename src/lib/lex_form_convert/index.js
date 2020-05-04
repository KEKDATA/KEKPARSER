'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const dictionary_1 = require('./dictionary');
exports.aposToLexForm = text => {
  const textWithWordBreak = text.split(' ');
  for (let wordIndex = 0; wordIndex < textWithWordBreak.length; wordIndex++) {
    let currentWord = textWithWordBreak[wordIndex];
    const isWordIncludesApostrophe = currentWord.includes('’');
    if (isWordIncludesApostrophe) {
      currentWord = currentWord.replace('’', "'");
    }
    const arrayOfDictionary = Object.keys(dictionary_1.dictionary);
    for (
      let apostropheIndex = 0;
      apostropheIndex < arrayOfDictionary.length;
      apostropheIndex++
    ) {
      const apostrophe = arrayOfDictionary[apostropheIndex];
      if (apostrophe === currentWord.toLowerCase()) {
        textWithWordBreak[wordIndex] = dictionary_1.dictionary[apostrophe];
      }
    }
  }
  return textWithWordBreak.join(' ');
};
