import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';

import { aposToLexForm } from '../lex_form_convert/apos_to_lex_form';
import { getTextWithAlphaOnly } from '../normalizers';

export const getTextWithSentimentAnalysis = (tweets: Array<string>) => {
  const tokenizer = new WordTokenizer();

  let meanSentiment = 0;
  let lengthOfTweets = tweets.length;

  const tweetsWithSentiments = [];

  for (let tweetIndex = 0; tweetIndex < lengthOfTweets; tweetIndex++) {
    const tweet = tweets[tweetIndex];

    const tweetLexicalForm = aposToLexForm(tweet);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const tokenizedTweet = tokenizer.tokenize(tweetWithAlphaOnly);

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    if (tweetWithoutStopWords.length === 0) {
      tweetsWithSentiments.push(0);
      lengthOfTweets = lengthOfTweets - 1;
      continue;
    }

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentCoefficient = analyzer.getSentiment(tweetWithoutStopWords);

    meanSentiment = Number(sentimentCoefficient) + meanSentiment;

    tweetsWithSentiments.push(sentimentCoefficient);
  }

  meanSentiment = meanSentiment / lengthOfTweets;

  return { tweetsWithSentiments, meanSentiment };
};
