import { combineReducers } from 'redux';
import todo from './todo';
import globalAlert from './global_alert';
import register from './register';

const rootReducer = combineReducers({
  todo,
  globalAlert,
  register
})

export default rootReducer;
