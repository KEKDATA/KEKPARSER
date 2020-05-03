import {
  getNormalizedThousandthValue,
  getTextOfChildNode,
} from '../../lib/helpers';
import {
  REPLY_SELECTOR,
  RETWEET_SELECTOR,
  TWEET_CONTENT_SELECTOR,
  TWEET_LIKE_SELECTOR,
  USER_NAME_SELECTOR,
} from './constants';

export const getTweetInfo = (tweetNode: Cheerio) => {
  const userName = getTextOfChildNode(tweetNode, USER_NAME_SELECTOR);
  const tweetContent = getTextOfChildNode(tweetNode, TWEET_CONTENT_SELECTOR);
  const likes = getTextOfChildNode(tweetNode, TWEET_LIKE_SELECTOR);
  const retweets = getTextOfChildNode(tweetNode, RETWEET_SELECTOR);
  const replies = getTextOfChildNode(tweetNode, REPLY_SELECTOR);

  const normalizedLikes = getNormalizedThousandthValue(likes);
  const normalizedRetweets = getNormalizedThousandthValue(retweets);
  const normalizedReplies = getNormalizedThousandthValue(replies);

  return {
    userName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
  };
};
