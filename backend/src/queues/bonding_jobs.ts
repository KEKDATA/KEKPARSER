import { createEvent, createEffect } from 'effector';
import { Queue } from 'bull';
import { nanoid } from 'nanoid';

import { combineEvents } from '../lib/combined_events';
import { insertionSentimentTweetsSort } from '../twitter/tweets/lib/insertion_sentiment_tweets_sort';

import { Tweet } from '../twitter/types';
import { sendFx } from '../socket';
import { getTextWithAlphaOnly } from '../lib/normalizers/alphabet';
import { getTextWithSentimentAnalysis } from '../lib/sentiment_analysis/sentiment_analysis';
import { getTextWithBayesClassifier } from '../lib/bayes_classifier/bayes_classifier';

export const analyzeTweetsFx = createEffect<
  {
    id: string;
    parsedTweets: Array<Tweet>;
    queue: Queue;
    tweetsType: 'top' | 'latest';
  },
  any
>({
  handler: async ({ id, parsedTweets, queue, tweetsType }) => {
    const sentimentJob = createEvent<{
      tweetsWithSentiments: number[];
      meanSentiment: number;
    }>();
    const bayesJob = createEvent<{ tweetsWithBayesClassifier: string[] }>();

    const jobsCombineEvents = combineEvents({
      sentimentJob,
      bayesJob,
    });

    const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
      const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);

      return tweetWithAlphaOnly;
    });

    const sentimentProcessName = `sentiment:${id}`;
    const bayesProcessName = `bayes:${id}`;

    queue.process(sentimentProcessName, function(job, done) {
      const {
        dataWithSentiments: tweetsWithSentiments,
        meanSentiment,
      } = getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);
      done(null, () => sentimentJob({ tweetsWithSentiments, meanSentiment }));
    });

    queue.process(bayesProcessName, function(job, done) {
      const tweetsWithBayesClassifier = getTextWithBayesClassifier(
        normalizedTweetsForAnalysis,
      );
      done(null, () => bayesJob({ tweetsWithBayesClassifier }));
    });

    queue.add(sentimentProcessName);
    queue.add(bayesProcessName);

    jobsCombineEvents.watch(
      async ({
        sentimentJob: { tweetsWithSentiments, meanSentiment },
        bayesJob: { tweetsWithBayesClassifier },
      }) => {
        const finalTweets = [];

        for (
          let tweetIndex = 0;
          tweetIndex < parsedTweets.length;
          tweetIndex++
        ) {
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

        sendFx({
          id,
          result: {
            finalTweets,
            meanSentiment,
            minCoefficient,
            maxCoefficient,
            tweetsType,
          },
        });
      },
    );
  },
});
