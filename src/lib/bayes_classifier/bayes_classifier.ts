import { BayesClassifier, NGrams } from 'natural';
//@ts-ignore
import SpellCorrector from 'spelling-corrector';

import { aposToLexForm } from '../lex_form_convert';

import { getTextWithAlphaOnly } from '../normalizers';
import { getTrainedBayesClassifier } from './index';
import { negativesWords } from './dataset/words/negative';
import { positivesWords } from './dataset/words/positive';

export const getTextWithBayesClassifier = (tweets: Array<string>) => {
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();

  const negativesNGrams = NGrams.ngrams(negativesWords, negativesWords.length);
  const positivesNGrams = NGrams.ngrams(positivesWords, positivesWords.length);

  const bayesClassifier: BayesClassifier = getTrainedBayesClassifier(
    (classifier: BayesClassifier) => {
      negativesNGrams.forEach(negativeNGram => {
        classifier.addDocument(negativeNGram, 'negative');
      });

      positivesNGrams.forEach(positiveNGram => {
        classifier.addDocument(positiveNGram, 'positive');
      });
    },
  );

  const tweetsWithBayesClassifier = tweets.map(tweet => {
    const tweetLexicalForm = aposToLexForm(tweet);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const classifierTweetContent = bayesClassifier.classify(tweetWithAlphaOnly);

    return classifierTweetContent;
  });

  return tweetsWithBayesClassifier;
};
