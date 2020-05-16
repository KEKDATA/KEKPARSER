import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';

export const getTextWithSentimentAnalysis = async (data: Array<string>) => {
  const tokenizer = new WordTokenizer();
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

  const dataWithSentiments = [];

  let countOfSentimentCoefficients = 0;
  let lengthOfData = data.length;

  for (let i = 0; i < lengthOfData; i++) {
    const elementOfData = data[i];

    const tokenizedData = tokenizer.tokenize(elementOfData);

    const dataWithoutStopWords = stopword.removeStopwords(tokenizedData);

    if (dataWithoutStopWords.length === 0) {
      dataWithSentiments.push(0);
      continue;
    }

    const sentimentCoefficient = Number(
      analyzer.getSentiment(dataWithoutStopWords),
    );

    countOfSentimentCoefficients =
      sentimentCoefficient + countOfSentimentCoefficients;

    dataWithSentiments.push(sentimentCoefficient);
  }

  const meanSentiment = countOfSentimentCoefficients / lengthOfData;

  return Promise.resolve({ dataWithSentiments, meanSentiment });
};
