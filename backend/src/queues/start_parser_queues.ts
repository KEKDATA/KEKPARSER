import Queue from 'bull';
import { nanoid } from 'nanoid';

import { Send } from '../types';
import { SEARCH_TWEETS_TARGET } from '../twitter/constants/type_parse_target';
import { sendFx } from '../socket';

import { OPTIONS, MAX_JOBS_PER_WORKER } from './config';

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

  const { tweetsSettings, parseUrl, parseTarget } = options;

  if (parseTarget === SEARCH_TWEETS_TARGET) {
    if (tweetsSettings && tweetsSettings.isTop) {
      const processName = `parse:${id}`;
      const tweetsType = 'top';

      console.log(processName);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          id: jobId,
          options,
          processName,
        });
      });
    }

    if (tweetsSettings && tweetsSettings.isLatest) {
      const processName = `parse:${id}`;
      const actualParseUrl = `${parseUrl}&f=live`;
      const tweetsType = 'latest';
      const actualOptions = {
        ...options,
        parseUrl: actualParseUrl,
      };

      console.log(processName);

      setTimeout(() => {
        const jobId = nanoid();

        callbackQueue.add({
          jobId,
          options: { tweetsType, id },
        });
        parserQueue.add({
          processName,
          id: jobId,
          options: actualOptions,
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
