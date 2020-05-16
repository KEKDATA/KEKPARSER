import { createEvent } from 'effector';

import { combineEvents } from '../lib/combined_events';
import { insertionSentimentTweetsSort } from '../twitter/tweets/lib/insertion_sentiment_tweets_sort';

import { Tweet } from '../twitter/types';

export const parseJob = createEvent<Array<Tweet>>();
export const sentimentJob = createEvent<{
  tweetsWithSentiments: number[];
  meanSentiment: number;
}>();
export const bayesJob = createEvent<{ tweetsWithBayesClassifier: string[] }>();

const jobsEvent = combineEvents({
  parseJob,
  sentimentJob,
  bayesJob,
});

jobsEvent.watch(
  ({
    parseJob: { parsedTweets },
    sentimentJob: { tweetsWithSentiments, meanSentiment },
    bayesJob: { tweetsWithBayesClassifier },
  }) => {
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

    console.log({
      finalTweets,
      meanSentiment,
      minCoefficient,
      maxCoefficient,
    });
  },
);
