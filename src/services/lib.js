// import { Schema, arrayOf, normalize } from 'normalizr';
// import { camelizeKeys } from 'humps';
// import merge from 'lodash/merge';
import 'isomorphic-fetch';
// import { dispatch } from '../index';
// import { history } from '../services';
// import { showAlert } from '../actions/global_alert';


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(endpoint, options) {
  const token = localStorage.getItem('user_token');
  if(token) {
    // set jwt token for authorization
    options.headers = { ...options.headers, 'Authorization': `Bearer ${token}` };
  }
  return fetch(endpoint, options)
    .then(response => {
      alertByHttpStatusCode(response.status);
      if (!response.ok) {
        return Promise.reject('http request failure!');
      }
      return response.json().then(json => ({ json, response }));
    })
    .then(({ json, response }) => {
      return json;
      // TODO 使用 normalizr 和 humps 规范化数据格式
      // const camelizedJson = camelizeKeys(json)
      // return merge({}, normalize(camelizedJson, schema))
    })
    .then(
      response => ({response}),
      error => ({error: error.message || 'Something bad happened'})
    )
}

// TODO 更多的处理方式
function alertByHttpStatusCode(code) {
  switch (code) {
    case 401:
      break;
    // TODO other http status code here
    default:
      return;
  }
}
