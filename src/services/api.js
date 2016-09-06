// api services

import { callApi } from './lib';

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.
// Read more about Normalizr: https://github.com/gaearon/normalizr



/**
 * 创建 todo
 */
export const createTodo = (text) => callApi(`/api/todos/`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text })
})

/**
 * toggle todo
 */
export const toggleTodo = (id) => callApi(`/api/todos/${id}/toggle`, {
  method: 'PUT',
  headers: {
    'Accept': 'application/json'
  }
})

/**
 * load todos
 */
export const loadTodos = () => callApi(`/api/todos`, {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
})

/**
 * 删除 todo
 */
export const deleteTodo = (id) => callApi(`/api/todos/${id}`, {
  method: 'DELETE',
  headers: {
    'Accept': 'application/json'
  }
})

/**
 * 注册
 */
export const register = (registerInfo) => callApi('/api/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ...registerInfo })
})

/**
 * 登录
 */
export const login = (loginUser) => callApi('/api/auth', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ ...loginUser })
})
