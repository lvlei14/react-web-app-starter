import * as todo from './todo';
import * as globalAlert from './global_alert';
import * as register from './register';


export const todoActions = todo;
export const globalAlertActions = globalAlert;
export const registerActions = register;

export default {
  todoActions,
  globalAlertActions,
  registerActions,
};
