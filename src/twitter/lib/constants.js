'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ENVIRONMENTS = process.env;
exports.DEFAULT_TWEETS_COUNT = 10;
exports.TWEETS_COUNT =
  Number(ENVIRONMENTS.TWEETS_COUNT) || exports.DEFAULT_TWEETS_COUNT;
exports.TWITTER_URL = 'https://twitter.com';
exports.TWEET_SELECTOR = '[data-testid="tweet"]';
exports.TWEET_LIKE_SELECTOR = '[data-testid="like"]';
exports.RETWEET_SELECTOR = '[data-testid="retweet"]';
exports.REPLY_SELECTOR = '[data-testid="reply"]';
exports.USER_NAME_SELECTOR = '.css-1dbjc4n.r-1awozwy.r-18u37iz.r-dnmrzs';
exports.TWEET_CONTENT_SELECTOR =
  '.css-901oao.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-bnwqim.r-qvutc0';
exports.MAX_TWEETS_EQUALS = 5;
