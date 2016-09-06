import { combineReducers } from 'redux';
import todo from './todo';
import globalAlert from './global_alert';
import register from './register';
import auth from './auth';

const rootReducer = combineReducers({
  todo,
  globalAlert,
  register,
  auth,
})

export default rootReducer;
