import {
  REPLY_SELECTOR,
  RETWEET_SELECTOR,
  TWEET_CONTENT_SELECTOR_MOBILE,
  TWEET_LIKE_SELECTOR,
  USER_NAME_SELECTOR,
} from '../constants/selectors';
import { getNormalizedThousandthValue } from '../../../lib/normalizers';
import { getTextOfChildNode } from '../../../lib/dom/nodes/text_child_node';
import { getTextOfChildNodes } from '../../../lib/dom/nodes/text_child_nodes';

const TWITTER_URL: string = 'https://twitter.com';

export const getTweetInfo = (tweetNode: Cheerio) => {
  const userNameSelector = tweetNode.find(USER_NAME_SELECTOR);

  const [name, tweetName] = getTextOfChildNodes(userNameSelector);
  const userUrl = `${TWITTER_URL}/${tweetName.replace('@', '')}`;

  const tweetContent = getTextOfChildNode(
    tweetNode,
    TWEET_CONTENT_SELECTOR_MOBILE,
  );
  const likes = getTextOfChildNode(tweetNode, TWEET_LIKE_SELECTOR);
  const retweets = getTextOfChildNode(tweetNode, RETWEET_SELECTOR);
  const replies = getTextOfChildNode(tweetNode, REPLY_SELECTOR);

  const normalizedLikes = getNormalizedThousandthValue(likes);
  const normalizedRetweets = getNormalizedThousandthValue(retweets);
  const normalizedReplies = getNormalizedThousandthValue(replies);

  return {
    userUrl,
    name,
    tweetName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
  };
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
