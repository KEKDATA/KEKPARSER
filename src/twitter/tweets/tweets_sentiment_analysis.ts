import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import SpellCorrector from 'spelling-corrector';
//@ts-ignore
import stopword from 'stopword';
import { expose } from 'threads/worker';

import { aposToLexForm } from '../../lib/lex_form_convert';
import { Tweet } from './types';

import { getTextWithAlphaOnly } from '../../lib/normalizers';

const tweetsSentimentAnalysis = (tweets: Array<Tweet>) => {
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();

  const tokenizer = new WordTokenizer();

  let meanSentiment = 0;

  const tweetsSentiments = tweets.map(({ tweetContent }) => {
    const tweetLexicalForm = aposToLexForm(tweetContent);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const tokenizedTweet = tokenizer
      .tokenize(tweetWithAlphaOnly)
      .map(word => spellCorrector.correct(word));

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentCoefficient = analyzer.getSentiment(tweetWithoutStopWords);

    meanSentiment = sentimentCoefficient + meanSentiment;

    return sentimentCoefficient;
  });

  meanSentiment = meanSentiment / tweets.length;

  return { tweetsSentiments, meanSentiment };
};

expose(tweetsSentimentAnalysis);
