import ProcessEnv = NodeJS.ProcessEnv;

const ENVIRONMENTS: ProcessEnv = process.env;

export const TWEETS_SCROLL_COUNT: number = Number(
  ENVIRONMENTS.TWEETS_SCROLL_COUNT,
);

export const TWEET_SELECTOR: string = '[role="article"]';
