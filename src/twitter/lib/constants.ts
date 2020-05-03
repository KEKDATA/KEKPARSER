import ProcessEnv = NodeJS.ProcessEnv;

const ENVIRONMENTS: ProcessEnv = process.env;

export const DEFAULT_TWEETS_SCROLL_COUNT: number = 4;

export const TWEETS_SCROLL_COUNT: number =
  Number(ENVIRONMENTS.TWEETS_SCROLL_COUNT) || DEFAULT_TWEETS_SCROLL_COUNT;

export const TWEET_SELECTOR: string = '[data-testid="tweet"]';

export const TWEET_LIKE_SELECTOR: string = '[data-testid="like"]';

export const RETWEET_SELECTOR: string = '[data-testid="retweet"]';

export const REPLY_SELECTOR: string = '[data-testid="reply"]';

export const USER_NAME_SELECTOR: string =
  '.css-1dbjc4n.r-1awozwy.r-18u37iz.r-dnmrzs';

export const TWEET_CONTENT_SELECTOR =
  '.css-901oao.r-hkyrab.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-bnwqim.r-qvutc0';
