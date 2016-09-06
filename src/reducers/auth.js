import { authActions } from '../actions';


let initState = {
  loginSuccess: false,
  user: null,
  token: '',
  errMessage: ''
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case authActions.LOGIN.REQUEST:
      return {
        ...state,
        loginSuccess: false,
        errMessage: '',
        user: null
      };
    case authActions.LOGIN.SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        user: action.response && action.response.user,
        token: action.response && action.response.token,
      };
    case authActions.LOGIN.FAILURE:
      return {
        ...state,
        loginSuccess: false,
        errMessage: action.response
      };
    default:
      return state;
  }
}
