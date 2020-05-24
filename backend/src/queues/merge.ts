import Queue from 'bull';
import { nanoid } from 'nanoid';

import { insertionSentimentTweetsSort } from '../twitter/tweets/lib/insertion_sentiment_tweets_sort';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';

const callbackQueue = new Queue('callback', OPTIONS);
const webQueue = new Queue('web', OPTIONS);

const jobsProgress = new Map();

callbackQueue.process(MAX_JOBS_PER_WORKER, job => {
  const { jobId, options } = job.data;

  const jobOptions = jobsProgress.get(jobId);

  const actualOptions = {
    ...jobOptions,
    ...options,
  };

  jobsProgress.set(jobId, actualOptions);

  const { isBayes, isSentiment } = actualOptions;

  if (isBayes && isSentiment) {
    const {
      tweetsWithSentiments,
      meanSentiment,
      tweetsWithBayesClassifier,
      parsedTweets,
      tweetsType,
      id,
    } = actualOptions;

    const finalTweets = [];

    for (let tweetIndex = 0; tweetIndex < parsedTweets.length; tweetIndex++) {
      const tweetId = nanoid();
      const tweetSentiment = tweetsWithSentiments[tweetIndex];
      const tweetBayes = tweetsWithBayesClassifier[tweetIndex];
      const parsedTweet = parsedTweets[tweetIndex];

      finalTweets.push({
        ...parsedTweet,
        tweetSentiment,
        tweetBayes,
        id: tweetId,
      });
    }

    const sortedSentimentCoefficients = insertionSentimentTweetsSort([
      ...finalTweets,
    ]);
    const minCoefficient = sortedSentimentCoefficients[0];
    const maxCoefficient =
      sortedSentimentCoefficients[sortedSentimentCoefficients.length - 1];

    webQueue.add({
      id,
      result: {
        finalTweets,
        meanSentiment,
        minCoefficient,
        maxCoefficient,
        tweetsType,
      },
    });
  }
});
