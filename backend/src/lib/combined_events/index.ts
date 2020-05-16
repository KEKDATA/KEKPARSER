import { createEvent, Event } from 'effector';

export const combineEvents = (events: { [key: string]: Event<any> }) => {
  const results: { [key: string]: Event<any> } = {};
  const resultingEvent: Event<any> = createEvent();
  const eventsKeys: Array<string> = Object.keys(events);

  eventsKeys.forEach((eventKey: string) => {
    const event = events[eventKey];
    const unwatch = event.watch((payload: any) => {
      results[eventKey] = payload;

      if (Object.keys(results).length === eventsKeys.length) {
        resultingEvent(results);
      }

      unwatch();
    });
  });

  return resultingEvent;
};
