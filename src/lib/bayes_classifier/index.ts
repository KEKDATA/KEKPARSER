import { BayesClassifier } from 'natural';

import { negativeTweets } from './airlines_dictionary/negative';
import { positiveTweets } from './airlines_dictionary/positive';
import { neutralTweets } from './airlines_dictionary/neutral';

export const getTrainedBayesClassifier = (addDocumentsCallback: Function) => {
  const bayesClassifier = new BayesClassifier();

  addDocumentsCallback(bayesClassifier);

  bayesClassifier.train();

  return bayesClassifier;
};

export const trainOnTheAirlinesDictionary = (classifier: BayesClassifier) => {
  negativeTweets.forEach((negativeTweet: string) =>
    classifier.addDocument(negativeTweet, 'negative'),
  );
  positiveTweets.forEach((positiveTweet: string) =>
    classifier.addDocument(positiveTweet, 'positive'),
  );
  neutralTweets.forEach((neutralTweet: string) =>
    classifier.addDocument(neutralTweet, 'neutral'),
  );
};
