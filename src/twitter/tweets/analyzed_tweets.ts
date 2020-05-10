import { getTextWithSentimentAnalysis } from '../../lib/sentiment_analysis/sentiment_analysis';
import { aposToLexForm } from '../../lib/lex_form_convert/apos_to_lex_form';
import { getTextWithAlphaOnly } from '../../lib/normalizers/alphabet';

import { getTextWithBayesClassifier } from '../../lib/bayes_classifier/bayes_classifier';
import { insertionTweetsSort } from './lib/insertion_tweets_sort';

import { getParsedTweets } from './parsed_tweets';

import { $webdriverPage } from '../model';

export const getAnalyzedTweets = async () => {
  const page = $webdriverPage.getState();

  const parsedTweets = await getParsedTweets(page);

  const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
    const tweetLexicalForm = aposToLexForm(tweetContent);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    return tweetWithAlphaOnly;
  });

  const {
    dataWithSentiments: tweetsWithSentiments,
    meanSentiment,
  } = getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);

  const tweetsWithBayesClassifier = getTextWithBayesClassifier(
    normalizedTweetsForAnalysis,
  );

  const finalTweets = [];

  for (let tweetIndex = 0; tweetIndex < parsedTweets.length; tweetIndex++) {
    const tweetSentiment = tweetsWithSentiments[tweetIndex];
    const tweetBayes = tweetsWithBayesClassifier[tweetIndex];
    const parsedTweet = parsedTweets[tweetIndex];

    finalTweets.push({
      ...parsedTweet,
      tweetSentiment,
      tweetBayes,
    });
  }

  const sortedSentimentCoefficients = insertionTweetsSort([...finalTweets]);
  const minCoefficient = sortedSentimentCoefficients[0];
  const maxCoefficient =
    sortedSentimentCoefficients[sortedSentimentCoefficients.length - 1];

  return {
    finalTweets,
    meanSentiment,
    minCoefficient,
    maxCoefficient,
  };
};
