import { OnChangeEvent } from './types/change';

export const getEventChecked = (event: OnChangeEvent) => event.target.checked;
