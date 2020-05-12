import { OnChangeEvent } from './change';

export const getEventValue = (event: OnChangeEvent) => event.target.value;
