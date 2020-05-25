import { dictionary } from './dictionary';

// Предложение
// Массив слов
// Обход каждого слова по словарю апострофов
// Преобразования форм can't -> can not
// Нормализованное предложение

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
