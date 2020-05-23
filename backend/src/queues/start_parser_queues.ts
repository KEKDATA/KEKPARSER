import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { $socketMessage, Send } from '../socket';
import { createdTwitterParse } from '../twitter/twitter_parse';
import { analyzeTweetsFx } from './bonding_jobs';
import { SEARCH_TWEETS_TARGET } from '../twitter/constants/type_parse_target';

const defaultJobOptions = {
  removeOnComplete: true,
  removeOnFail: false,
};

export const startParserQueues = (message: { options: Send; id: string }) => {
  const { options, id } = message;
  const { tweetsSettings, parseUrl, parseTarget } = options;

  if (parseTarget === SEARCH_TWEETS_TARGET) {
    if (tweetsSettings && tweetsSettings.isTop) {
      const queue = new Queue(`${id}:top`, { defaultJobOptions });
      const processName = `parse:${id}`;
      const tweetsType = 'top';

      console.log(processName);

      queue.process(processName, async function(job, done) {
        const actualId = id;
        const actualQueue = queue;
        await setupWebdriverFx({ options });
        const { parsedTweets } = await createdTwitterParse(null);
        done(null, () =>
          analyzeTweetsFx({
            parsedTweets,
            id: actualId,
            queue: actualQueue,
            tweetsType,
          }),
        );
      });

      queue.on('progress', function(job, progress) {
        console.log(`Job ${job.id} is ${progress * 100}% ready!`);
      });

      queue.on('completed', function(job, jobEvent) {
        console.log(`Parse Job ${job.id} completed!`);
        jobEvent();
      });

      queue.add(processName);
    }

    if (tweetsSettings && tweetsSettings.isLatest) {
      const queue = new Queue(`${id}:latest`, { defaultJobOptions });
      const processName = `parse:${id}`;
      const actualParseUrl = `${parseUrl}&f=live`;
      const tweetsType = 'latest';
      const actualOptions = {
        ...options,
        parseUrl: actualParseUrl,
      };

      console.log(processName);

      queue.process(processName, async function(job, done) {
        const actualId = id;
        const actualQueue = queue;
        await setupWebdriverFx({
          options: actualOptions,
        });
        const { parsedTweets } = await createdTwitterParse(null);
        done(null, () =>
          analyzeTweetsFx({
            parsedTweets,
            id: actualId,
            queue: actualQueue,
            tweetsType,
          }),
        );
      });

      queue.on('progress', function(job, progress) {
        console.log(`Job ${job.id} is ${progress * 100}% ready!`);
      });

      queue.on('completed', function(job, jobEvent) {
        console.log(`Parse Job ${job.id} completed!`);
        jobEvent();
      });

      queue.add(processName);
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
