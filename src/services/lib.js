// import { Schema, arrayOf, normalize } from 'normalizr';
// import { camelizeKeys } from 'humps';
// import merge from 'lodash/merge';
import 'isomorphic-fetch';


// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
export function callApi(endpoint, options) {
  return fetch(endpoint, options)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
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
