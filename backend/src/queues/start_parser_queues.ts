import Queue from 'bull';

import { Send } from '../types';
import { SEARCH_TWEETS_TARGET } from '../twitter/constants/type_parse_target';
import { sendFx } from '../socket';
import { nanoid } from 'nanoid';

const defaultJobOptions = {
  removeOnComplete: true,
  removeOnFail: false,
};

const redis = {
  host: 'localhost',
  port: 6379,
  maxRetriesPerRequest: null,
  connectTimeout: 180000,
};

const options = { defaultJobOptions, redis };

const parserQueue = new Queue(`parser`, options);
const callbackQueue = new Queue('callback', options);
const socketSendQueue = new Queue('web', options);

const maxJobsPerWorker = 10;

socketSendQueue.process(maxJobsPerWorker, job => {
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
