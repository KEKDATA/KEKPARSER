import { aposToLexForm } from '../lex_form_convert/apos_to_lex_form';
import { ENG, RU } from '../../constants/language';

export const getTextWithAlphaOnly = (text: string) => {
  const textLexicalForm = aposToLexForm(text);
  const casedText = textLexicalForm.toLowerCase();
  const withoutLinks = casedText.replace(/(https?:\/\/[^\s]+)/g, '');
  const russianText = withoutLinks.replace(/[^а-яА-Я0-9\s]+/g, '');
  const englishText = withoutLinks.replace(/[^a-zA-Z0-9\s]+/g, '');

  let language = '';

  if (russianText.length > englishText.length) {
    language = RU;
  } else {
    language = ENG;
  }

  let normalizedText = '';

  switch (language) {
    case RU: {
      normalizedText = russianText;
      break;
    }

    case ENG: {
      normalizedText = englishText;
      break;
    }

    default: {
      break;
    }
  }

  return { text: normalizedText, language };
};
