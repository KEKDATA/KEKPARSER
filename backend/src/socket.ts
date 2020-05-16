import WebSocket from 'ws';
import {
  createEvent,
  createStore,
  createEffect,
  Event,
  Effect,
} from 'effector';
import http from 'http';
import { nanoid } from 'nanoid';

import { startParserQueues } from './queues/start_parser_queues';
import { FinalTweet } from './twitter/types';

export type ProfileSettings = {
  isLikes: boolean;
  isTweets: boolean;
  isTweetsAndReplies: boolean;
  isMedia: boolean;
};

export type TweetsSettings = {
  isTop: boolean;
  isLatest: boolean;
};

export type Send = {
  parseTarget: string;
  tweetsCount: number;
  parseUrl: string;
  profileSettings?: ProfileSettings;
  tweetsSettings?: TweetsSettings;
};

let socketCollection: { [id: string]: WebSocket.Server } = {};

export const $socketMessage = createStore<Send | {}>({});

export const sendFx: Effect<
  {
    result: {
      finalTweets: Array<FinalTweet>;
      meanSentiment: number;
      minCoefficient: FinalTweet;
      maxCoefficient: FinalTweet;
    };
    id: string;
  },
  any
> = createEffect();

const connection: Event<any> = createEvent('connection');
const onMessage: Event<{ options: Send; id: string }> = createEvent('message');

$socketMessage.on(onMessage, (_, { options, id }) => ({
  options,
  id,
}));

$socketMessage.updates.watch(startParserQueues);

sendFx.use(({ result, id }) => {
  const serializedData = JSON.stringify(result);
  const currentSocket = socketCollection[id];
  // @ts-ignore
  currentSocket.send(serializedData);

  delete socketCollection[id];
});

sendFx.done.watch(payload => {
  console.log('Response: ', payload);
});

sendFx.fail.watch(fail => {
  // capture error callback
  console.log('Error:', fail);
});

connection.watch(wsServer => {
  const id = nanoid();

  console.info('Connection with user is open');

  wsServer.id = id;
  socketCollection[wsServer.id] = wsServer;

  wsServer.on('message', (message: string) => {
    const options = JSON.parse(message);
    return onMessage({ options, id });
  });
});

export const connectionSockets = () => {
  const server = http.createServer();

  let socket;

  try {
    console.log('Try to connect...');
    socket = new WebSocket.Server({
      server,
    });
  } catch (err) {
    throw new Error(err.message);
  }

  socket.on('connection', connection);

  server.listen(8000);
};
