'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const helpers_1 = require('../../lib/helpers');
const constants_1 = require('./constants');
exports.getTweetInfo = tweetNode => {
  const userHref = tweetNode
    .find(constants_1.USER_NAME_SELECTOR)
    .parent()
    .attr('href');
  const userUrl = `${constants_1.TWITTER_URL}${userHref}`;
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
    userUrl,
    userName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
  };
};
exports.getTweetUploadStatus = () => {
  const loaderSelector =
    '.css-1dbjc4n.r-1awozwy.r-16y2uox.r-1777fci.r-utggzx.r-tvv088';
  const loaderNode = document.querySelector(loaderSelector);
  const isTweetsAvailable = loaderNode === null;
  return isTweetsAvailable;
};
exports.scrollToLastTweet = () => {
  const tweets = document.querySelectorAll('[role="article"]');
  if (tweets.length > 0) {
    const latestTweet = tweets[tweets.length - 1];
    if (latestTweet) {
      latestTweet.scrollIntoView();
    }
  }
};
