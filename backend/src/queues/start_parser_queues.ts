import { nanoid } from 'nanoid';
import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { Send } from '../socket';
import { createdTwitterParse } from '../twitter/twitter_parse';
import { parseJob } from './bonding_jobs';

export const startParserQueues = (options: Send) => {
  const id = nanoid();

  const queue = new Queue(id);
  const processName = `parse:${id}`;

  queue.process(processName, async function(job, done) {
    await setupWebdriverFx({ options, id, queue });
    await createdTwitterParse(null);
    done(null, () => parseJob(true));
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
