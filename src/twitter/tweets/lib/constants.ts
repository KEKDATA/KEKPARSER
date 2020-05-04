import ProcessEnv = NodeJS.ProcessEnv;

const ENVIRONMENTS: ProcessEnv = process.env;

export const DEFAULT_TWEETS_COUNT: number = 10;

export const TWEETS_COUNT: number =
  Number(ENVIRONMENTS.TWEETS_COUNT) || DEFAULT_TWEETS_COUNT;

export const MAX_TWEETS_EQUALS = 5;
