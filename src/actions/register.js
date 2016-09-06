import { createRequestTypes, createAction } from './lib';

/**
 * 注册
 */
export const REGISTER = createRequestTypes('REGISTER');

export const actions = {
  request: (registerInfo) => createAction(REGISTER.REQUEST, {registerInfo}),
  success: response => createAction(REGISTER.SUCCESS, {response}),
  failure: error => createAction(REGISTER.FAILURE, {error}),
}

export const register = (registerInfo) => createAction(REGISTER.type, {registerInfo});
