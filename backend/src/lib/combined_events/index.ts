import { createEvent, Event } from 'effector';

export const combineEvents = (events: { [key: string]: Event<any> }) => {
  const results: { [key: string]: Event<any> } = {};
  const resultingEvent: Event<any> = createEvent();
  const eventsKeys: Array<string> = Object.keys(events);

  eventsKeys.forEach((eventName: string) => {
    const event = events[eventName];
    const unwatch = event.watch((payload: any) => {
      results[eventName] = payload;

      if (Object.keys(results).length === eventsKeys.length) {
        resultingEvent(results);
      }

      unwatch();
    });
  });

  return resultingEvent;
};
