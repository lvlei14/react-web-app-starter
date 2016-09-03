import { todoActions } from '../actions';


// todos: [{
//   text: '测试1',
//   id: '001',
// }, {
//   text: '测试2',
//   id: '002'
// }],

let initState = {
  todos: [],
  filter: 'all',              // 'all' | 'uncomplete' | 'complete'
  sort: 'taskHeight',         // 'taskHeight' | 'time',
  inputTodoText: '',
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case todoActions.CREATE_TODO.REQUEST:
      return state;

    case todoActions.CREATE_TODO.SUCCESS:
      return {...state, todos: [...state.todos, {...action.response}]};

    case todoActions.CREATE_TODO.FAILURE:
      return state;

    default:
      return state
  }
}
