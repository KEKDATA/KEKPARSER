export const scrollToLastTweet = () => {
  const tweets = document.querySelectorAll('[role="article"]');

  if (tweets.length > 0) {
    const latestTweet = tweets[tweets.length - 1];

    if (latestTweet) {
      latestTweet.scrollIntoView();
    }
  }
};
