'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const natural_1 = require('natural');
//@ts-ignore
const spelling_corrector_1 = __importDefault(require('spelling-corrector'));
//@ts-ignore
const stopword_1 = __importDefault(require('stopword'));
const worker_1 = require('threads/worker');
const lex_form_convert_1 = require('../../lib/lex_form_convert');
const sentimentAnalysis = tweets => {
  const spellCorrector = new spelling_corrector_1.default();
  spellCorrector.loadDictionary();
  const tokenizer = new natural_1.WordTokenizer();
  const normalizedTweets = tweets.map(({ tweetContent, ...otherTweetInfo }) => {
    const tweetLexicalForm = lex_form_convert_1.aposToLexForm(tweetContent);
    const casedTweet = tweetLexicalForm.toLowerCase();
    const alphaOnlyTweet = casedTweet.replace(/[^a-zA-Z\s]+/g, '');
    const tokenizedTweet = tokenizer
      .tokenize(alphaOnlyTweet)
      .map(word => spellCorrector.correct(word));
    const filteredReview = stopword_1.default.removeStopwords(tokenizedTweet);
    const analyzer = new natural_1.SentimentAnalyzer(
      'English',
      natural_1.PorterStemmer,
      'afinn',
    );
    const analysis = analyzer.getSentiment(filteredReview);
    return {
      ...otherTweetInfo,
      tweetContent: tweetLexicalForm,
      analysis,
    };
  });
  return normalizedTweets;
};
worker_1.expose(sentimentAnalysis);
