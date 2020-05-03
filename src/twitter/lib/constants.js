'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ENVIRONMENTS = process.env;
exports.DEFAULT_TWEETS_SCROLL_COUNT = 4;
exports.TWEETS_SCROLL_COUNT =
  Number(ENVIRONMENTS.TWEETS_SCROLL_COUNT) ||
  exports.DEFAULT_TWEETS_SCROLL_COUNT;
exports.TWEET_SELECTOR = '[data-testid="tweet"]';
exports.TWEET_LIKE_SELECTOR = '[data-testid="like"]';
exports.RETWEET_SELECTOR = '[data-testid="retweet"]';
exports.REPLY_SELECTOR = '[data-testid="reply"]';
exports.USER_NAME_SELECTOR = '.css-1dbjc4n.r-1awozwy.r-18u37iz.r-dnmrzs';
exports.TWEET_CONTENT_SELECTOR =
  '.css-901oao.r-hkyrab.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-bnwqim.r-qvutc0';
