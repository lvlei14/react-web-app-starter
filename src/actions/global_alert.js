import { createAction } from './lib';

export const SHOW_ALERT = 'SHOW_ALERT';
export const HIDE_ALERT = 'HIDE_ALERT';

export const showAlert = (message) => createAction(SHOW_ALERT, {message})
export const hideAlert = () => createAction(HIDE_ALERT)
