import { createRequestTypes, createAction } from './lib';

/**
 * 新建
 */
export const LOGIN = createRequestTypes('LOGIN');

export const loginActions = {
  request: (loginUser) => createAction(LOGIN.REQUEST, {loginUser}),
  success: response => createAction(LOGIN.SUCCESS, {response}),
  failure: error => createAction(LOGIN.FAILURE, {error}),
}

export const login = (loginUser) => createAction(LOGIN.type, {loginUser});
