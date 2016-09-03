import { globalAlertActions } from '../actions';


// todos: [{
//   text: '测试1',
//   id: '001',
// }, {
//   text: '测试2',
//   id: '002'
// }],

let initState = {
  show: false,
  message: '',
};

export default function globalAlertReducer(state = initState, action) {
  switch (action.type) {
    case globalAlertActions.SHOW_ALERT:
      return {...state, show: true, message: action.message};

    case globalAlertActions.HIDE_ALERT:
      return {...state, show: false, message: ''};

    default:
      return state
  }
}
