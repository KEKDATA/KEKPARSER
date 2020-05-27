import Queue from 'bull';
import { nanoid } from 'nanoid';

import { Send } from '../types';
import {
  SEARCH_TWEETS_TARGET,
  PROFILE_TARGET,
} from '../twitter/constants/type_parse_target';
import { sendFx } from '../socket';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';
import { TWEETS_TAB, TWEETS_REPLIES_TAB } from '../twitter/constants/tabs';

const parserQueue = new Queue(`parser`, OPTIONS);
const callbackQueue = new Queue('callback', OPTIONS);
const socketSendQueue = new Queue('web', OPTIONS);

console.info('start parser queues connected');

socketSendQueue.process(MAX_JOBS_PER_WORKER, job => {
  const { id, result } = job.data;

  sendFx({
    id,
    result,
  });
});

export const startParserQueues = (message: { options: Send; id: string }) => {
  const { options, id } = message;

  const { tweetsSettings, profileSettings, parseUrl, parseTarget } = options;
  const processName = `parse:${id}`;

  if (parseTarget === PROFILE_TARGET) {
    if (profileSettings && profileSettings.isTweets) {
      const tweetsType = TWEETS_TAB;

      console.log(`${processName}, ${tweetsType}`);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          id: jobId,
          options,
          tweetsType,
        });
      });
    }

    if (profileSettings && profileSettings.isTweetsAndReplies) {
      const tweetsType = TWEETS_REPLIES_TAB;

      console.log(`${processName}, ${tweetsType}`);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          id: jobId,
          options,
          tweetsType,
        });
      });
    }
  }

  if (parseTarget === SEARCH_TWEETS_TARGET) {
    if (tweetsSettings && tweetsSettings.isTop) {
      const tweetsType = 'top';

      console.log(`${processName}, ${tweetsType}`);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          id: jobId,
          options,
          tweetsType,
        });
      });
    }

    if (tweetsSettings && tweetsSettings.isLatest) {
      const actualParseUrl = `${parseUrl}&f=live`;
      const tweetsType = 'latest';
      const actualOptions = {
        ...options,
        parseUrl: actualParseUrl,
      };

      console.log(`${processName}, ${tweetsType}`);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          id: jobId,
          options: actualOptions,
          tweetsType,
        });
      });
    }
  }

  // const UserOptions = sequelize.define(id, {
  //   userOptions: {
  //     type: Sequelize.STRING,
  //   },
  // });
  // UserOptions.sync({ force: true }).then(() => {
  //   UserOptions.create({
  //     userOptions: options,
  //   });
  // });
};
