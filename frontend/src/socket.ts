import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
} from 'effector';
import { Latest, Top, Tweets, TweetsAndReplies } from './types/profile';

const URL = 'ws://127.0.0.1:8000';

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

export type FinalTweet = {
  id: string;
  userUrl: string;
  name: string;
  tweetName: string;
  tweetContent: string;
  likes: number;
  retweets: number;
  replies: number;
  replyingUsers?: Array<{ user: string; userLink: string }>;
  tweetSentiment: number;
  tweetBayes: string;
};

export type TakenTweetsInfo = {
  finalTweets: Array<FinalTweet>;
  meanSentiment: number | null;
  minCoefficient: FinalTweet;
  maxCoefficient: FinalTweet;
  tweetsType: Top | Latest | Tweets | TweetsAndReplies | null;
};

let socket: WebSocket;

export const $socketMessage = createStore<TakenTweetsInfo>({
  finalTweets: [],
  meanSentiment: null,
  minCoefficient: <FinalTweet>{},
  maxCoefficient: <FinalTweet>{},
  tweetsType: null,
});

export const sendFx: Effect<Send, any> = createEffect();

export const onMessage: Event<WebSocketMessageEvent> = createEvent('message');
const open: Event<any> = createEvent('open');
const closed: Event<WebSocketCloseEvent> = createEvent('closed');
const error: Event<WebSocketErrorEvent> = createEvent('error');

$socketMessage.on(onMessage, (_, event) => JSON.parse(event.data));

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

error.watch(err => {
  console.error(`[error] ${err.message || 'connection was not opened'}`);
});

export const connection = () => {
  try {
    console.log('Try to connect...');
    socket = new WebSocket(URL);
  } catch (err) {
    throw new Error(err.message);
  }

  socket.onopen = open;
  socket.onclose = closed;
  socket.onerror = error;
  socket.onmessage = onMessage;
};
