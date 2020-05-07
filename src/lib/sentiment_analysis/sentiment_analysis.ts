import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';

import { aposToLexForm } from '../lex_form_convert';
import { getTextWithAlphaOnly } from '../normalizers';

export const getTextWithSentimentAnalysis = (tweets: Array<string>) => {
  const tokenizer = new WordTokenizer();

  let meanSentiment = 0;

  const tweetsWithSentiments = tweets.map(tweet => {
    const tweetLexicalForm = aposToLexForm(tweet);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const tokenizedTweet = tokenizer.tokenize(tweetWithAlphaOnly);

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentCoefficient = analyzer.getSentiment(tweetWithoutStopWords);

    meanSentiment = sentimentCoefficient + meanSentiment;

    return sentimentCoefficient;
  });

  meanSentiment = meanSentiment / tweets.length;

  return { tweetsWithSentiments, meanSentiment };
};
