import { createEffect, attach, combine } from 'effector';
import { Queue } from 'bull';

import { getTextWithSentimentAnalysis } from '../../lib/sentiment_analysis/sentiment_analysis';
import { getTextWithAlphaOnly } from '../../lib/normalizers/alphabet';

import { getTextWithBayesClassifier } from '../../lib/bayes_classifier/bayes_classifier';
import { insertionSentimentTweetsSort } from './lib/insertion_sentiment_tweets_sort';

import { getParsedTweets } from './parsed_tweets';
import { Tweet } from '../types';
import { $ID, $queue } from '../model';
import { bayesJob, sentimentJob } from '../../queues/bonding_jobs';

const analyzedTweetsFx = createEffect<{ id: string; queue: Queue }, any>({
  handler: async ({ id, queue }) => {
    const parsedTweets: Array<Tweet> = await getParsedTweets(null);

    const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
      const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);

      return tweetWithAlphaOnly;
    });

    const sentimentProcessName = `sentiment:${id}`;
    const bayesProcessName = `bayes:${id}`;

    queue.process(sentimentProcessName, async function(job, done) {
      const {
        dataWithSentiments: tweetsWithSentiments,
        meanSentiment,
      } = await getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);
      done(null, () => sentimentJob(true));
    });

    queue.process(bayesProcessName, async function(job, done) {
      const tweetsWithBayesClassifier = await getTextWithBayesClassifier(
        normalizedTweetsForAnalysis,
      );
      done(null, () => bayesJob(true));
    });

    queue.add(sentimentProcessName);
    queue.add(bayesProcessName);

    const {
      dataWithSentiments: tweetsWithSentiments,
      meanSentiment,
    } = await getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);

    const tweetsWithBayesClassifier = await getTextWithBayesClassifier(
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

    return Promise.resolve({
      finalTweets,
      meanSentiment,
      minCoefficient,
      maxCoefficient,
    });
  },
});

export const getAnalyzedTweets = attach({
  effect: analyzedTweetsFx,
  source: combine({ id: $ID, queue: $queue }),
  mapParams: (_, sources) => sources,
});
