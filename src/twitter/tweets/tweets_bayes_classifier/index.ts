import { getWordsTrigramsBayesClassifier } from '../../../lib/bayes_classifier/trigrams/words/bayes_words';

export const getTextWithBayesClassifier = (tweets: Array<string>) => {
  const bayesClassifier = getWordsTrigramsBayesClassifier();

  const tweetsWithBayesClassifier = [];

  for (let tweetIndex = 0; tweetIndex < tweets.length; tweetIndex++) {
    const tweet = tweets[tweetIndex];

    const classifierTweetContent = bayesClassifier.classify(tweet);

    tweetsWithBayesClassifier.push(classifierTweetContent);
  }

  return tweetsWithBayesClassifier;
};
