import { Page } from 'playwright';

import { getParsedTweets } from './lib/parsed_tweets';
import { getTextWithSentimentAnalysis } from '../../lib/sentiment_analysis/sentiment_analysis';
import { getTextWithBayesClassifier } from '../../lib/bayes_classifier/bayes_classifier';

export const getFinalTweets = async (page: Page) => {
  const parsedTweets = await getParsedTweets(page);

  const normalizedTweetsForAnalysis = parsedTweets.map(
    ({ tweetContent }) => tweetContent,
  );

  const { tweetsWithSentiments, meanSentiment } = getTextWithSentimentAnalysis(
    normalizedTweetsForAnalysis,
  );
  const tweetsBayes = getTextWithBayesClassifier(normalizedTweetsForAnalysis);

  const finalTweets = [];

  for (let tweetIndex = 0; tweetIndex < parsedTweets.length; tweetIndex++) {
    const tweetSentiment = tweetsWithSentiments[tweetIndex];
    const tweetBayes = tweetsBayes[tweetIndex];
    const parsedTweet = parsedTweets[tweetIndex];

    finalTweets.push({
      ...parsedTweet,
      tweetSentiment,
      tweetBayes,
    });
  }

  return {
    finalTweets,
    meanSentiment,
  };
};
