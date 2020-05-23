import { aposToLexForm } from '../lex_form_convert/apos_to_lex_form';

export const getTextWithAlphaOnly = (text: string) => {
  const textLexicalForm = aposToLexForm(text);
  const casedText = textLexicalForm.toLowerCase();
  const textWithAlphaOnly = casedText.replace(/[^a-zA-Z\s]+/g, '');

  return textWithAlphaOnly;
};
