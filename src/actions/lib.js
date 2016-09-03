/**
 * http request status
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

/**
 * example:  createRequestTypes("Test") ==>
 * {
     "REQUEST": "Test_REQUEST",
     "SUCCESS": "Test_SUCCESS",
     "FAILURE": "Test_FAILURE",
     "type"   : "Test",
   }
 */
export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
		acc[type] = `${base}_${type}`;
		return acc;
	}, {type: base})
}

export function createAction(type, payload = {}) {
  return {type, ...payload};
}
