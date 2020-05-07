import { BayesClassifier } from 'natural';

import { negativeTweets } from './dataset/airlines_dictionary/negative';
import { positiveTweets } from './dataset/airlines_dictionary/positive';
import { neutralTweets } from './dataset/airlines_dictionary/neutral';

export const getTrainedBayesClassifier = (addDocumentsCallback: Function) => {
  const bayesClassifier = new BayesClassifier();

  addDocumentsCallback(bayesClassifier);

  bayesClassifier.train();

  return bayesClassifier;
};

export const getTrainedBayesAirlinesClassifier = () => {
  const bayesClassifier = new BayesClassifier();

  negativeTweets.forEach((negativeTweet: string) =>
    bayesClassifier.addDocument(negativeTweet, 'negative'),
  );
  positiveTweets.forEach((positiveTweet: string) =>
    bayesClassifier.addDocument(positiveTweet, 'positive'),
  );
  neutralTweets.forEach((neutralTweet: string) =>
    bayesClassifier.addDocument(neutralTweet, 'neutral'),
  );

  bayesClassifier.train();

  return bayesClassifier;
};
