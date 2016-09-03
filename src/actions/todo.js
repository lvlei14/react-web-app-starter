import { createRequestTypes, createAction } from './lib';

/**
 * 新建
 */
export const CREATE_TODO = createRequestTypes('CREATE_TODO');

export const create = {
  request: text => createAction(CREATE_TODO.REQUEST, {text}),
  success: response => createAction(CREATE_TODO.SUCCESS, {response}),
  failure: error => createAction(CREATE_TODO.FAILURE, {error}),
}

export const createTodo = (text) => createAction(CREATE_TODO.type, {text});

/**
 * toggle
 */
export const TOGGLE_TODO = createRequestTypes('COMPLETE_TODO');

export const toggle = {
  request: id => createAction(TOGGLE_TODO.REQUEST, {id}),
  success: response => createAction(TOGGLE_TODO.SUCCESS, {response}),
  failure: error => createAction(TOGGLE_TODO.FAILURE, {error}),
}

/**
 * 获取所有 todo
 */
export const LOAD_TODOS = createRequestTypes('LOAD_TODOS');

export const load = {
 request: () => createAction(LOAD_TODOS.REQUEST),
 success: response => createAction(LOAD_TODOS.SUCCESS, {response}),
 failure: error => createAction(LOAD_TODOS.FAILURE, {error}),
}

/**
 * 删除
 */
export const DELETE_TODO = createRequestTypes('DELETE_TODO');

export const remove = {
  request: id => createAction(DELETE_TODO.REQUEST, {id}),
  success: response => createAction(DELETE_TODO.SUCCESS, {response}),
  failure: error => createAction(DELETE_TODO.FAILURE, {error}),
}
