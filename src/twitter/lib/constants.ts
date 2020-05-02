import ProcessEnv = NodeJS.ProcessEnv;

const ENVIRONMENTS: ProcessEnv = process.env;

export const ARTICLE_SCROLL_COUNT: number = Number(
  ENVIRONMENTS.ARTICLE_SCROLL_COUNT,
);

export const ARTICLE_SELECTOR: string = '[role="article"]';
