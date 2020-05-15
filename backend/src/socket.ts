import WebSocket from 'ws';
import {
  createEvent,
  createStore,
  createEffect,
  Event,
  Effect,
} from 'effector';
import http from 'http';

import { startParserQueues } from './queues/start_parser_queues';

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
let socket: WebSocket.Server;

export const $socketMessage = createStore<Send | {}>({});

export const sendFx: Effect<Send, any> = createEffect();

const connection: Event<any> = createEvent('connection');
const onMessage: Event<any> = createEvent('message');

$socketMessage.on(onMessage, (_, message) => JSON.parse(message));

$socketMessage.updates.watch(startParserQueues);

sendFx.use((data: Send) => {
  console.log('Sended data:', data);
  const serializedData = JSON.stringify(data);
  // @ts-ignore
  socket.send(serializedData);
});

sendFx.done.watch(payload => {
  console.log('Response: ', payload);
});

sendFx.fail.watch(fail => {
  // capture error callback
  console.log('Error:', fail);
});

connection.watch(ws => {
  console.info('Connection with user is open');

  ws.on('message', onMessage);
});

export const connectionSockets = () => {
  const server = http.createServer();

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
