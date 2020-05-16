import { $socketMessage } from '../../../socket';

export const $tweets = $socketMessage.map(({ finalTweets }) => finalTweets);
