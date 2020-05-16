import { createEffect } from 'effector';

import { getParsedTweets } from './parsed_tweets';
import { Tweet } from '../types';

export const parsedTweetsFx = createEffect<any, any>({
  handler: async () => {
    const parsedTweets: Array<Tweet> = await getParsedTweets(null);

    // const normalizedTweetsForAnalysis = parsedTweets.map(({ tweetContent }) => {
    //   const tweetWithAlphaOnly = getTextWithAlphaOnly(tweetContent);
    //
    //   return tweetWithAlphaOnly;
    // });
    //
    // const sentimentProcessName = `sentiment:${id}`;
    // const bayesProcessName = `bayes:${id}`;
    //
    // queue.process(sentimentProcessName, async function(job, done) {
    //   const {
    //     dataWithSentiments: tweetsWithSentiments,
    //     meanSentiment,
    //   } = await getTextWithSentimentAnalysis(normalizedTweetsForAnalysis);
    //   done(null, () => sentimentJob({ tweetsWithSentiments, meanSentiment }));
    // });
    //
    // queue.process(bayesProcessName, async function(job, done) {
    //   const tweetsWithBayesClassifier = await getTextWithBayesClassifier(
    //     normalizedTweetsForAnalysis,
    //   );
    //   done(null, () => bayesJob({ tweetsWithBayesClassifier }));
    // });
    //
    // queue.add(sentimentProcessName);
    // queue.add(bayesProcessName);

    return Promise.resolve({ parsedTweets });
  },
});
