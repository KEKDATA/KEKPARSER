import {
  WordTokenizer,
  PorterStemmer,
  //@ts-ignore
  SentimentAnalyzer,
} from 'natural';
//@ts-ignore
import stopword from 'stopword';

export const getTextWithSentimentAnalysis = (tweets: Array<string>) => {
  const tokenizer = new WordTokenizer();
  const tweetsWithSentiments = [];

  let countOfSentimentCoefficients = 0;
  let lengthOfTweets = tweets.length;

  for (let tweetIndex = 0; tweetIndex < lengthOfTweets; tweetIndex++) {
    const tweet = tweets[tweetIndex];

    const tokenizedTweet = tokenizer.tokenize(tweet);

    const tweetWithoutStopWords = stopword.removeStopwords(tokenizedTweet);

    if (tweetWithoutStopWords.length === 0) {
      tweetsWithSentiments.push(0);
      continue;
    }

    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentCoefficient = Number(
      analyzer.getSentiment(tweetWithoutStopWords),
    );

    countOfSentimentCoefficients =
      sentimentCoefficient + countOfSentimentCoefficients;

    tweetsWithSentiments.push(sentimentCoefficient);
  }

  const meanSentiment = countOfSentimentCoefficients / lengthOfTweets;

  return { tweetsWithSentiments, meanSentiment };
};
