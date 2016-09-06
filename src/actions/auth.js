import { createRequestTypes, createAction } from './lib';

/**
 * 登录
 */
export const LOGIN = createRequestTypes('LOGIN');

export const loginActions = {
  request: (loginUser) => createAction(LOGIN.REQUEST, {loginUser}),
  success: response => createAction(LOGIN.SUCCESS, {response}),
  failure: error => createAction(LOGIN.FAILURE, {error}),
}

export const login = (loginUser) => createAction(LOGIN.type, {loginUser});

/**
 * 使用 jwt token 加载用户信息
 */
export const LOAD_AUTH_BY_JWTTOKEN = createRequestTypes('LOAD_AUTH_BY_JWTTOKEN');

export const loadAuthByJwtTokenActions = {
  request: () => createAction(LOAD_AUTH_BY_JWTTOKEN.REQUEST),
  success: response => createAction(LOAD_AUTH_BY_JWTTOKEN.SUCCESS, {response}),
  failure: error => createAction(LOAD_AUTH_BY_JWTTOKEN.FAILURE, {error}),
}

export const loadAuthByJwtToken = () => createAction(LOAD_AUTH_BY_JWTTOKEN.type);
export const isAuthLoaded = (store) => store.user;
