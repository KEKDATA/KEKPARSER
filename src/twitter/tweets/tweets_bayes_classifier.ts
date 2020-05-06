import { BayesClassifier } from 'natural';
//@ts-ignore
import SpellCorrector from 'spelling-corrector';
import { expose } from 'threads/worker';

import { aposToLexForm } from '../../lib/lex_form_convert';
import { Tweet } from './types';

import { getTextWithAlphaOnly } from '../../lib/normalizers';
import { getTrainedBayesClassifier } from '../../lib/bayes_classifier';
import { negativesWords } from '../../lib/bayes_classifier/dataset/words/negative';
import { positivesWords } from '../../lib/bayes_classifier/dataset/words/positive';

const tweetsClassifier = (tweets: Array<Tweet>) => {
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();

  const bayesClassifier: BayesClassifier = getTrainedBayesClassifier(
    (classifier: BayesClassifier) => {
      classifier.addDocument(negativesWords, 'negative');
      classifier.addDocument(positivesWords, 'positive');
    },
  );

  const tweetsWithBayesClassifier = tweets.map(({ tweetContent }) => {
    const tweetLexicalForm = aposToLexForm(tweetContent);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const classifierTweetContent = bayesClassifier.classify(tweetWithAlphaOnly);

    return classifierTweetContent;
  });

  return tweetsWithBayesClassifier;
};

expose(tweetsClassifier);
