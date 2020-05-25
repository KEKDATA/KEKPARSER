import { getWordsTrigramsBayesClassifier } from './trigrams/words/bayes_words';

export const getTextWithBayesClassifier = (data: Array<string>) => {
  const bayesClassifier = getWordsTrigramsBayesClassifier();

  const dataWithBayesClassifier = [];

  for (let i = 0; i < data.length; i++) {
    const elementOfData = data[i];

    const classifierData = bayesClassifier.classify(elementOfData);

    dataWithBayesClassifier.push(classifierData);
  }

  return dataWithBayesClassifier;
};
