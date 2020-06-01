import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';

export const getTextWithSentimentAnalysis = (
  data: Array<{ text: string; textIndex: number }>,
) => {
  const tokenizer = new WordTokenizer();
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

  const dataWithSentiments: { [key: string]: number } = {};

  let countOfSentimentCoefficients = 0;

  for (let i = 0; i < data.length; i++) {
    const { text, textIndex } = data[i];

    const tokenizedData = tokenizer.tokenize(text);

    const dataWithoutStopWords = stopword.removeStopwords(tokenizedData);

    if (dataWithoutStopWords.length === 0) {
      dataWithSentiments[textIndex] = 0;
      continue;
    }

    const sentimentCoefficient = Number(
      analyzer.getSentiment(dataWithoutStopWords),
    );

    countOfSentimentCoefficients =
      sentimentCoefficient + countOfSentimentCoefficients;

    dataWithSentiments[textIndex] = sentimentCoefficient;
  }

  return { dataWithSentiments, countOfSentimentCoefficients };
};
