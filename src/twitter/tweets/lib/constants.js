'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ENVIRONMENTS = process.env;
exports.DEFAULT_TWEETS_COUNT = 10;
exports.TWEETS_COUNT =
  Number(ENVIRONMENTS.TWEETS_COUNT) || exports.DEFAULT_TWEETS_COUNT;
exports.MAX_TWEETS_EQUALS = 5;
