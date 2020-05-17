import { $socketMessage } from '../../../socket';

export const $finalTweets = $socketMessage.map(
  ({ finalTweets }) => finalTweets,
);
