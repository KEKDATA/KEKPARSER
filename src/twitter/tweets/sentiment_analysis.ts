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
import { tweet } from './types';

const sentimentAnalysis = (tweets: Array<tweet>) => {
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();

  const tokenizer = new WordTokenizer();

  const normalizedTweets = tweets.map(({ tweetContent, ...otherTweetInfo }) => {
    const tweetLexicalForm = aposToLexForm(tweetContent);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const alphaOnlyTweet = casedTweet.replace(/[^a-zA-Z\s]+/g, '');

    const tokenizedTweet = tokenizer
      .tokenize(alphaOnlyTweet)
      .map(word => spellCorrector.correct(word));

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const analysis = analyzer.getSentiment(tweetWithoutStopWords);

    return {
      ...otherTweetInfo,
      tweetContent: tweetLexicalForm,
      analysis,
    };
  });

  return normalizedTweets;
};

expose(sentimentAnalysis);
