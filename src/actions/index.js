import * as todo from './todo';
import * as globalAlert from './global_alert';
import * as register from './register';
import * as auth from './auth';


export const todoActions = todo;
export const globalAlertActions = globalAlert;
export const registerActions = register;
export const authActions = auth;

export default {
  todoActions,
  globalAlertActions,
  registerActions,
  authActions,
};
