import { TWEET_REPLYING_SELECTOR } from '../../constants/selectors';
import { TWITTER_URL } from './constants';

export const getReplyingInfo = (tweetNode: Cheerio) => {
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
