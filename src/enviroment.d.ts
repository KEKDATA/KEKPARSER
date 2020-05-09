declare namespace NodeJS {
  export interface ProcessEnv {
    START_URL: string;
    TWEETS_COUNT: string;
    HEADLESS_BROWSER: string;
    TWITTER_PARSE_TARGET: 'profile' | 'tweets';
  }
}
