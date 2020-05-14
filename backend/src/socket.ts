import WebSocket from 'ws';
import {
  createEvent,
  createStore,
  createEffect,
  forward,
  Event,
  Effect,
} from 'effector';
import { parseInit } from './index';

type Send =
  | {
      parseTarget: string;
      tweetsCount: number;
      parseUrl: string;
      profileStore?: {
        isLikes: boolean;
        isTweets: boolean;
        isTweetsAndReplies: boolean;
        isMedia: boolean;
      };
      tweetsStore?: {
        isTop: boolean;
        isLikes: boolean;
      };
    }
  | {};

let socket: WebSocket;

const URL = 'ws://127.0.0.1:8000';

export const $ID = createStore<string>('');
export const $socketMessage = createStore<string>('');

export const sendFx: Effect<Send, any> = createEffect();

export const setID: Event<string> = createEvent();
const onMessage: Event<any> = createEvent('message');
const open: Event<any> = createEvent('open');
const closed: Event<any> = createEvent('closed');

$ID.on(setID, (_, id) => id);

setID.watch(id => parseInit(id));

$socketMessage.on(onMessage, (_, event) => event.data);

sendFx.use((data: Send) => {
  console.log('Sended data:', data);
  const serializedData = JSON.stringify(data);
  socket.send(serializedData);
});

sendFx.done.watch(payload => {
  console.log('Response: ', payload);
});

sendFx.fail.watch(fail => {
  // capture error callback
  console.log('Error:', fail);
});

open.watch(() => {
  console.info('Connection is open');
});

closed.watch(({ code, reason }) => {
  console.warn(`[close] Connection is closed, code=${code} reason=${reason}`);
});

forward({
  from: open,
  to: setID,
});

export const connection = (id: string) => {
  try {
    console.log('Try to connect...');
    socket = new WebSocket(URL);
  } catch (err) {
    throw new Error(err.message);
  }

  socket.on('open', () => open(id));
  socket.on('close', closed);
  socket.on('message', onMessage);
};
