import Queue from 'bull';
import { nanoid } from 'nanoid';

import { insertionSentimentTweetsSort } from '../twitter/tweets/lib/insertion_sentiment_tweets_sort';

const defaultJobOptions = {
  removeOnComplete: true,
  removeOnFail: false,
};

const redis = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 180000,
};

const options = { defaultJobOptions, redis };

const callbackQueue = new Queue('callback', options);
const webQueue = new Queue('web', options);

const jobsProgress = new Map();

const maxJobsPerWorker = 10;

callbackQueue.process(maxJobsPerWorker, job => {
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
