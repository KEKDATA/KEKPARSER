import { spawn, Thread, Worker } from 'threads';

import { Tweet } from '../types';
import {
  REPLY_SELECTOR,
  RETWEET_SELECTOR,
  TWEET_CONTENT_SELECTOR,
  TWEET_LIKE_SELECTOR,
  USER_NAME_SELECTOR,
} from '../constants/selectors';
import { getNormalizedThousandthValue } from '../../../lib/normalizers';
import { getTextOfChildNode } from '../../../lib/dom/nodes';

const TWITTER_URL: string = 'https://twitter.com';

export const getTweetInfo = (tweetNode: Cheerio) => {
  const userHref = tweetNode
    .find(USER_NAME_SELECTOR)
    .parent()
    .attr('href');
  const userUrl = `${TWITTER_URL}${userHref}`;

  const userName = getTextOfChildNode(tweetNode, USER_NAME_SELECTOR);
  const tweetContent = getTextOfChildNode(tweetNode, TWEET_CONTENT_SELECTOR);
  const likes = getTextOfChildNode(tweetNode, TWEET_LIKE_SELECTOR);
  const retweets = getTextOfChildNode(tweetNode, RETWEET_SELECTOR);
  const replies = getTextOfChildNode(tweetNode, REPLY_SELECTOR);

  const normalizedLikes = getNormalizedThousandthValue(likes);
  const normalizedRetweets = getNormalizedThousandthValue(retweets);
  const normalizedReplies = getNormalizedThousandthValue(replies);

  return {
    userUrl,
    userName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
  };
};

export const getTweetUploadStatus = () => {
  const loaderSelector =
    '.css-1dbjc4n.r-1awozwy.r-16y2uox.r-1777fci.r-utggzx.r-tvv088';
  const loaderNode = document.querySelector(loaderSelector);
  const isTweetsAvailable = loaderNode === null;

  return isTweetsAvailable;
};

export const scrollToLastTweet = () => {
  const tweets = document.querySelectorAll('[role="article"]');

  if (tweets.length > 0) {
    const latestTweet = tweets[tweets.length - 1];

    if (latestTweet) {
      latestTweet.scrollIntoView();
    }
  }
};

export const getTweetsSentiments = async (tweets: Array<Tweet>) => {
  const getTweetsWithSentimentAnalysis = await spawn(
    new Worker('../tweets_sentiment_analysis'),
  );
  const {
    tweetsSentiments,
    meanSentiment,
  } = await getTweetsWithSentimentAnalysis(tweets);
  await Thread.terminate(getTweetsWithSentimentAnalysis);

  console.log('tweets sentiments:', tweetsSentiments);
  console.log('mean sentiment:', meanSentiment);

  console.timeEnd();
};

export const getTweetsBayesClassifier = async (tweets: Array<Tweet>) => {
  const getTweetsWithBayesClassifier = await spawn(
    new Worker('../tweets_bayes_classifier'),
  );
  const tweetsWithBayesClassifier = await getTweetsWithBayesClassifier(tweets);
  await Thread.terminate(getTweetsWithBayesClassifier);

  console.log('tweets bayes classifier:', tweetsWithBayesClassifier);
};
