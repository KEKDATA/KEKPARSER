import { createEffect, Effect } from 'effector';

import { getTextOfChildNodes } from '../../lib/dom/nodes/text_child_nodes';
import { TWITTER_URL } from './lib/tweet_info/constants';
import { getReplyingInfo } from './lib/tweet_info/replying_info';
import { getTextOfChildNode } from '../../lib/dom/nodes/text_child_node';
import { getNormalizedThousandthValue } from '../../lib/normalizers/thousandth_count';

import {
  REPLY_SELECTOR,
  RETWEET_SELECTOR,
  TWEET_CONTENT_SELECTOR_MOBILE,
  TWEET_LIKE_SELECTOR,
  USER_NAME_SELECTOR,
} from './constants/selectors';

export const tweetInfoFx: Effect<
  {
    tweetNode: Cheerio;
    isProfileTarget: boolean;
  },
  any
> = createEffect();

tweetInfoFx.use(({ tweetNode, isProfileTarget }) => {
  const userNameSelector = tweetNode.find(USER_NAME_SELECTOR);

  // Если попался элемент с Related searches
  if (userNameSelector.text().length === 0) {
    return null;
  }

  const [name, tweetName] = getTextOfChildNodes(userNameSelector);

  const userUrl = `${TWITTER_URL}/${tweetName.replace('@', '')}`;

  const replyingUsers = isProfileTarget ? getReplyingInfo(tweetNode) : [];

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
});
