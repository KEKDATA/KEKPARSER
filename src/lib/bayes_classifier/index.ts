import { BayesClassifier } from 'natural';

export const getTrainedBayesClassifier = (addDocumentsCallback: Function) => {
  const bayesClassifier = new BayesClassifier();

  addDocumentsCallback(bayesClassifier);

  bayesClassifier.train();

  return bayesClassifier;
};
