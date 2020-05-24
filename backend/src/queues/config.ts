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

export const OPTIONS = { defaultJobOptions, redis };
export const MAX_JOBS_PER_WORKER = 10;
