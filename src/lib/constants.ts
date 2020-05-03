import ProcessEnv = NodeJS.ProcessEnv;

const ENVIRONMENTS: ProcessEnv = process.env;

export const BROWSER_URL: string = ENVIRONMENTS.START_URL;

export const HEADLESS_BROWSER: boolean = true;

export const VIEWPORT_OPTIONS: { width: number; height: number } = {
  width: 1800,
  height: 800,
};
