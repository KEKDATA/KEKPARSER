'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const helpers_1 = require('../../lib/helpers');
const constants_1 = require('./constants');
exports.getTweetInfo = tweetNode => {
  const userName = helpers_1.getTextOfChildNode(
    tweetNode,
    constants_1.USER_NAME_SELECTOR,
  );
  const tweetContent = helpers_1.getTextOfChildNode(
    tweetNode,
    constants_1.TWEET_CONTENT_SELECTOR,
  );
  const likes = helpers_1.getTextOfChildNode(
    tweetNode,
    constants_1.TWEET_LIKE_SELECTOR,
  );
  const retweets = helpers_1.getTextOfChildNode(
    tweetNode,
    constants_1.RETWEET_SELECTOR,
  );
  const replies = helpers_1.getTextOfChildNode(
    tweetNode,
    constants_1.REPLY_SELECTOR,
  );
  const normalizedLikes = helpers_1.getNormalizedThousandthValue(likes);
  const normalizedRetweets = helpers_1.getNormalizedThousandthValue(retweets);
  const normalizedReplies = helpers_1.getNormalizedThousandthValue(replies);
  return {
    userName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
  };
};
