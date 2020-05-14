import { nanoid } from 'nanoid';
import Queue from 'bull';

import { setupWebdriverFx } from '../webdriver';

import { Send } from '../socket';

export const startParserQueues = (options: Send) => {
  const id = nanoid();

  const queue = new Queue('kek');

  queue.process(async function(job, done) {
    await setupWebdriverFx(options);
    done();
    return Promise.resolve();
  });

  queue.on('progress', function(job, progress) {
    console.log(`Job ${job.id} is ${progress * 100}% ready!`);
  });

  queue.on('completed', function(job, result) {
    console.log(`Job ${job.id} completed! Result: ${result}`);
    job.remove();
  });

  queue.add({ foo: 'bar' });

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
