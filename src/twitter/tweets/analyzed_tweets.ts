import { getTextWithSentimentAnalysis } from '../../lib/sentiment_analysis/sentiment_analysis';
import { getTextWithAlphaOnly } from '../../lib/normalizers/alphabet';

import { getTextWithBayesClassifier } from '../../lib/bayes_classifier/bayes_classifier';
import { insertionSentimentTweetsSort } from './lib/insertion_sentiment_tweets_sort';

import { getParsedTweets } from './parsed_tweets';

import { $webdriverPage } from '../model';

export const getAnalyzedTweets = async () => {
  const page = $webdriverPage.getState();

  const parsedTweets = await getParsedTweets(page);

  const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
    const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);

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

  const sortedSentimentCoefficients = insertionSentimentTweetsSort([
    ...finalTweets,
  ]);
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
