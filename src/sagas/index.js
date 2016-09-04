/* eslint-disable no-constant-condition */
import { take, put, call, fork, /*select*/ } from 'redux-saga/effects';
import { api, /*history*/ } from '../services';
import { todoActions as todo } from '../actions';

// import { getUser, getRepo, getStarredByUser, getStargazersByRepo } from '../reducers/selectors';


/***************************** Subroutines ************************************/
// resuable fetch Subroutine
// action : 资源操作实体
// apiFn  : api.createTodo | api.toggleTodo | ...
// args   :
function* execHttpActions(action, apiFn, args) {
  yield put( action.request(args) );
  const {response, error} = yield call(apiFn, args);
  if(response) {
    yield put( action.success(response) );
    yield put({type: 'SHOW_ALERT', message: response.message});
  } else {
    yield put( action.failure(error) )
  }
}

// yeah! we can also bind Generators
export const createTodo       = execHttpActions.bind(null, todo.create, api.createTodo);
export const toggleTodo       = execHttpActions.bind(null, todo.toggle, api.toggleTodo);
export const loadTodos        = execHttpActions.bind(null, todo.load, api.loadTodos);
export const deleteTodo       = execHttpActions.bind(null, todo.remove, api.deleteTodo);


/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

// trigger router navigation via history
// function* watchNavigate() {
//   while(true) {
//     const {pathname} = yield take(actions.NAVIGATE)
//     yield history.push(pathname)
//   }
// }

// Fetches data for a User : user data + starred repos
function* watchCreateTodo() {
  while(true) {
    const { text } = yield take(todo.CREATE_TODO.type);
    yield fork(createTodo, text);
  }
}

function* watchDeleteTodo() {
  while(true) {
    const { id } = yield take(todo.DELETE_TODO.type);
    yield fork(deleteTodo, id);
  }
}

function* watchToggleTodo() {
  while(true) {
    const { id } = yield take(todo.TOGGLE_TODO.type);
    yield fork(toggleTodo, id);
  }
}

function* watchLoadTodos() {
  while(true) {
    yield take(todo.LOAD_TODOS.type);
    yield fork(loadTodos);
  }
}

export default function* root() {
  yield [
    // fork(watchNavigate),
    fork(watchCreateTodo),
    fork(watchDeleteTodo),
    fork(watchToggleTodo),
    fork(watchLoadTodos),
  ]
}
