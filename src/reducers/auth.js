import { authActions } from '../actions';


let initState = {
  loginSuccess: false,
  user: null,
  token: '',
  loadingAuth: false,
  loadAuthFailed: false,
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
      const token = action.response && action.response.token;
      localStorage.setItem('user_token', token);
      return {
        ...state,
        loginSuccess: true,
        user: action.response && action.response.user,
        token: token,
      };
    case authActions.LOGIN.FAILURE:
      return {
        ...state,
        loginSuccess: false,
        errMessage: action.response
      };

    // load auth by jwt token
    case authActions.LOAD_AUTH_BY_JWTTOKEN.REQUEST:
      return {
        ...state,
        errMessage: '',
        loadingAuth: true,
        loadAuthFailed: false,
      };
    case authActions.LOAD_AUTH_BY_JWTTOKEN.SUCCESS:
      return {
        ...state,
        loadingAuth: false,
        user: action.response && action.response.user,
        loadAuthFailed: false,
      };
    case authActions.LOAD_AUTH_BY_JWTTOKEN.FAILURE:
      return {
        ...state,
        loadingAuth: false,
        errMessage: action.error,
        loadAuthFailed: true,
      };
    case authActions.LOGOUT.type:
      localStorage.removeItem('user_token');
      return {
        ...state,
        user: null,
        token: '',
      }

    default:
      return state;
  }
}
