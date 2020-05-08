import { Page } from 'playwright';

import { getTextWithSentimentAnalysis } from '../../lib/sentiment_analysis/sentiment_analysis';

import { getParsedTweets } from './parsed_tweets';
import { getTextWithBayesClassifier } from './tweets_bayes_classifier';

export const getFinalTweets = async (page: Page) => {
  const parsedTweets = await getParsedTweets(page);

  const normalizedTweetsForAnalysis = parsedTweets.map(
    ({ tweetContent }) => tweetContent,
  );

  const { tweetsWithSentiments, meanSentiment } = getTextWithSentimentAnalysis(
    normalizedTweetsForAnalysis,
  );
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

  return {
    finalTweets,
    meanSentiment,
  };
};
