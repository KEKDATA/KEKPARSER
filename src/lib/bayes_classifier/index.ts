import { BayesClassifier } from 'natural';

import { negativeTweets } from './airlines_dictionary/negative';
import { positiveTweets } from './airlines_dictionary/positive';
import { neutralTweets } from './airlines_dictionary/neutral';

export const getTrainedBayesClassifier = (callback: Function) => {
  const bayesClassifier = new BayesClassifier();

  callback();

  bayesClassifier.train();

  return bayesClassifier;
};

export const trainOnTheAirlinesDictionary = (classifier: BayesClassifier) => {
  negativeTweets.forEach(negativeTweet =>
    classifier.addDocument(negativeTweet, 'negative'),
  );
  positiveTweets.forEach(positiveTweet =>
    classifier.addDocument(positiveTweet, 'positive'),
  );
  neutralTweets.forEach(neutralTweet =>
    classifier.addDocument(neutralTweet, 'neutral'),
  );
};
