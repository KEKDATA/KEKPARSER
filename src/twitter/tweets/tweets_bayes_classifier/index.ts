import { aposToLexForm } from '../../../lib/lex_form_convert/apos_to_lex_form';
import { getTextWithAlphaOnly } from '../../../lib/normalizers';
import { getWordsTrigramsBayesClassifier } from '../../../lib/bayes_classifier/trigrams/words/bayes_words';

export const getTextWithBayesClassifier = (tweets: Array<string>) => {
  const bayesClassifier = getWordsTrigramsBayesClassifier();

  const tweetsWithBayesClassifier = tweets.map(tweet => {
    const tweetLexicalForm = aposToLexForm(tweet);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const classifierTweetContent = bayesClassifier.classify(tweetWithAlphaOnly);

    return classifierTweetContent;
  });

  return tweetsWithBayesClassifier;
};
