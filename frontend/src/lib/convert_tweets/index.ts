import {
  FinalConvertedTweet,
  FinalTweet,
  TakenTweetsInfo,
} from '../../types/tweets';

export const getConvertedTweets = (
  _: Array<FinalTweet>,
  { finalTweets }: TakenTweetsInfo,
): Array<FinalConvertedTweet> => {
  const normalizedTweets = finalTweets.map((tweet: FinalTweet) => {
    const normalizedReplies =
      tweet.replyingUsers.length > 0
        ? tweet.replyingUsers
            // @ts-ignore ¯\_(ツ)_/¯
            .map(
              ({ user, userLink }: { user: string; userLink: string }) =>
                `${user} ${userLink}`,
            )
            .join(', ')
        : '';
    return {
      ...tweet,
      replyingUsers: normalizedReplies,
    };
  });

  return normalizedTweets;
};
