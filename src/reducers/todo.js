import { todoActions } from '../actions';
import findIndex from 'lodash/findIndex';


// todos: [{
//   text: '测试1',
//   _id: '001',
//   isCompleted: false,
//   isDeleted: false
// }, {
//   text: '测试2',
//   _id: '002'
//   isCompleted: false,
//   isDeleted: false
// }],

let initState = {
  todos: [],
  filter: 'all',              // 'all' | 'uncomplete' | 'completed'|'deleted'
  sort: 'taskHeight',         // 'taskHeight' | 'time',
  createTodoSuccess: false,
  deleteTodoSuccess: false,
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    // load todos
    case todoActions.LOAD_TODOS.REQUEST:
      return state;
    case todoActions.LOAD_TODOS.SUCCESS:
      return {
        ...state,
        todos: action.response && action.response.todos,
      };
    case todoActions.LOAD_TODOS.FAILURE:
      return state;

    // filter todos
    case todoActions.FILTER_TODO:
      return {
        ...state,
        filter: action.filter
      };

    // create todos
    case todoActions.CREATE_TODO.REQUEST:
      return {
        ...state,
        createTodoSuccess: false
      };
    case todoActions.CREATE_TODO.SUCCESS:
      return {
        ...state,
        todos: [...state.todos, {...action.response}],
        createTodoSuccess: true
      };
    case todoActions.CREATE_TODO.FAILURE:
      return state;

    // toggle todos
    case todoActions.TOGGLE_TODO.REQUEST:
      return state;
    case todoActions.TOGGLE_TODO.SUCCESS:
      const toggledTodoId = action.response && action.response.id;
      if (!toggledTodoId) {
        return state;
      }
      const indexOfToggleTodo = findIndex(state.todos, (todo) => todo._id.toString() === toggledTodoId.toString());
      const targetTodo = state.todos[indexOfToggleTodo];
      targetTodo.isCompleted = !targetTodo.isCompleted;
      return {
        ...state,
        todos: [...state.todos.slice(0, indexOfToggleTodo), targetTodo, ...state.todos.slice(indexOfToggleTodo + 1)],
      };
    case todoActions.TOGGLE_TODO.FAILURE:
      return state;

    // delete todos
    case todoActions.DELETE_TODO.REQUEST:
      return {
        ...state,
        deleteTodoSuccess: false
      };
    case todoActions.DELETE_TODO.SUCCESS:
      const deletedTodoId = action.response && action.response.id;
      if (!deletedTodoId) {
        return state;
      }
      const indexOfDeletedTodo = findIndex(state.todos, (todo) => todo._id.toString() === deletedTodoId.toString());
      const deletedTodo = state.todos[indexOfDeletedTodo];
      deletedTodo.isDeleted = !deletedTodo.isDeleted;
      return {
        ...state,
        todos: [...state.todos.slice(0, indexOfDeletedTodo), deletedTodo, ...state.todos.slice(indexOfDeletedTodo + 1)],
      };
    case todoActions.DELETE_TODO.FAILURE:
      return state;

    default:
      return state
  }
}
