import { combineReducers } from 'redux';
import todo from './todo';
import globalAlert from './global_alert';

const rootReducer = combineReducers({
  todo,
  globalAlert
})

export default rootReducer;
