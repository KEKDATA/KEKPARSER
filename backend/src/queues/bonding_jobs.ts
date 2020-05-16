import { createEvent } from 'effector';

import { combineEvents } from '../lib/combined_events';

export const parseJob = createEvent<boolean>();
export const sentimentJob = createEvent<boolean>();
export const bayesJob = createEvent<boolean>();

const jobsEvent = combineEvents({
  parseJob,
  sentimentJob,
  bayesJob,
});

jobsEvent.watch(console.log);
