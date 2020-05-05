import {
  WordTokenizer,
  PorterStemmer,
  BayesClassifier,
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

import { getTextWithAlphaOnly } from '../../lib/helpers';
import {
  getTrainedBayesClassifier,
  trainOnTheAirlinesDictionary,
} from '../../lib/bayes_classifier';

const tweetsAnalysis = (tweets: Array<Tweet>) => {
  const spellCorrector = new SpellCorrector();
  spellCorrector.loadDictionary();

  const tokenizer = new WordTokenizer();

  const bayesClassifier: BayesClassifier = getTrainedBayesClassifier(
    trainOnTheAirlinesDictionary,
  );

  const normalizedTweets = tweets.map(({ tweetContent, ...otherTweetInfo }) => {
    const tweetLexicalForm = aposToLexForm(tweetContent);

    const casedTweet = tweetLexicalForm.toLowerCase();
    const tweetWithAlphaOnly = getTextWithAlphaOnly(casedTweet);

    const tokenizedTweet = tokenizer
      .tokenize(tweetWithAlphaOnly)
      .map(word => spellCorrector.correct(word));

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentCoefficient = analyzer.getSentiment(tweetWithoutStopWords);

    const classifierTweetContent = bayesClassifier.classify(tweetWithAlphaOnly);

    return {
      ...otherTweetInfo,
      tweetContent: tweetLexicalForm,
      sentimentCoefficient,
      classifierTweetContent,
    };
  });

  return normalizedTweets;
};

expose(tweetsAnalysis);
