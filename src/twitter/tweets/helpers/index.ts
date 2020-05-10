import {
  REPLY_SELECTOR,
  RETWEET_SELECTOR,
  TWEET_CONTENT_SELECTOR_MOBILE,
  TWEET_LIKE_SELECTOR,
  TWEET_REPLYING_SELECTOR,
  USER_NAME_SELECTOR,
} from '../constants/selectors';
import { getNormalizedThousandthValue } from '../../../lib/normalizers';
import { getTextOfChildNode } from '../../../lib/dom/nodes/text_child_node';
import { getTextOfChildNodes } from '../../../lib/dom/nodes/text_child_nodes';
import { TWEETS_REPLIES_TAB } from '../../constants';

const TWITTER_URL: string = 'https://twitter.com';

const getReplyingInfo = (tweetNode: Cheerio) => {
  const replyingNode = tweetNode.find(TWEET_REPLYING_SELECTOR);
  const replyingUsers = [];

  if (replyingNode.text().length > 0) {
    const userLinks = replyingNode.find('[role="link"]');

    if (userLinks.length > 0) {
      for (let i = 0; i < userLinks.length; i++) {
        const linkNode = userLinks.eq(i);

        if (!linkNode) {
          break;
        }

        const href = linkNode.attr('href');
        const userLink = `${TWITTER_URL}${href}`;

        const user = linkNode.text();

        replyingUsers.push({
          userLink,
          user,
        });
      }
    }
  }

  return replyingUsers;
};

export const getTweetInfo = (tweetNode: Cheerio, profileTabType?: string) => {
  const userNameSelector = tweetNode.find(USER_NAME_SELECTOR);

  const [name, tweetName] = getTextOfChildNodes(userNameSelector);
  const userUrl = `${TWITTER_URL}/${tweetName.replace('@', '')}`;

  const replyingUsers =
    profileTabType === TWEETS_REPLIES_TAB ? getReplyingInfo(tweetNode) : [];

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

  const tweetInfo = {
    userUrl,
    name,
    tweetName,
    tweetContent,
    likes: normalizedLikes,
    retweets: normalizedRetweets,
    replies: normalizedReplies,
    replyingUsers,
  };

  return tweetInfo;
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
