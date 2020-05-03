'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ENVIRONMENTS = process.env;
exports.BROWSER_URL = ENVIRONMENTS.START_URL;
exports.HEADLESS_BROWSER = true;
exports.VIEWPORT_OPTIONS = {
  width: 1800,
  height: 800,
};
