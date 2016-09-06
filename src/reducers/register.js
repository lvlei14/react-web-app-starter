import { registerActions } from '../actions';


let initState = {
  registerSuccess: false,
  errMessage: ''
};

export default function registerReducer(state = initState, action) {
  switch (action.type) {
    case registerActions.REGISTER.REQUEST:
      return {
        ...state,
        registerSuccess: false,
        errMessage: ''
      };
    case registerActions.REGISTER.SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    case registerActions.REGISTER.FAILURE:
      return {
        ...state,
        registerSuccess: false,
        errMessage: action.response && action.response.errMessage
      };
    default:
      return state;
  }
}
