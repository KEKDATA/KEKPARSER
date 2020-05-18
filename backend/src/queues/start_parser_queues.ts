import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { Send } from '../socket';
import { createdTwitterParse } from '../twitter/twitter_parse';
import { analyzeTweetsFx } from './bonding_jobs';

export const startParserQueues = (message: { options: Send; id: string }) => {
  const { options, id } = message;

  const queue = new Queue(id);
  const processName = `parse:${id}`;

  console.log(processName);

  queue.process(processName, async function(job, done) {
    const actualId = id;
    const actualQueue = queue;
    await setupWebdriverFx({ options, id: actualId, queue: actualQueue });
    const { parsedTweets } = await createdTwitterParse(null);
    done(null, () =>
      analyzeTweetsFx({ parsedTweets, id: actualId, queue: actualQueue }),
    );
  });

  queue.on('progress', function(job, progress) {
    console.log(`Job ${job.id} is ${progress * 100}% ready!`);
  });

  queue.on('completed', function(job, jobEvent) {
    console.log(`Parse Job ${job.id} completed!`);
    jobEvent();
    job.remove();
  });

  queue.add(processName);

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
