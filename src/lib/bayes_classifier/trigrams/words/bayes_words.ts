import { BayesClassifier } from 'natural';

import { negativeTrigramsWords } from './negative';
import { positiveTrigramsWords } from './positive';
import { getTrainedBayesClassifier } from '../../train_bayes_classifier';

export const getWordsTrigramsBayesClassifier = () => {
  const negativesNGrams = negativeTrigramsWords;
  const positivesNGrams = positiveTrigramsWords;

  const bayesClassifier: BayesClassifier = getTrainedBayesClassifier(
    (classifier: BayesClassifier) => {
      negativesNGrams.forEach(negativeNGram => {
        classifier.addDocument(negativeNGram, 'negative');
      });

      positivesNGrams.forEach(positiveNGram => {
        classifier.addDocument(positiveNGram, 'positive');
      });
    },
  );

  return bayesClassifier;
};
