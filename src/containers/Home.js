import React, { PropTypes }from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { todoActions } from '../actions';


const backgroundPaperStyle = {
  minHeight: 300,
  width: "90%",
  margin: "7px auto",
};

const todoPannelStyle = {
  width: "50%",
  margin: "0 auto",
  textAlign: 'center',
};

const normalFilterStyle = {
  display: 'inline-block',
  marginLeft: '7px',
  fontWeight: '100',
};

const selectedFilterStyle = {
  display: 'inline-block',
  marginLeft: '7px',
  fontWeight: '500',
  color: 'rgb(0, 188, 212)'
};



const deletedTodoStyle = {textDecoration: "line-through", color: "#ccc"};


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createTodo = this.createTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodoHandle = this.toggleTodoHandle.bind(this);
    this.textInputChanged = this.textInputChanged.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.genStatusFilterBar = this.genStatusFilterBar.bind(this);

    this.state = {
      textInputValue: '',
    };
  }

  componentDidMount() {
    this.refs.taskInput.focus();
    // ReactDOM.findDOMNode(this.refs.taskInput).focus();
  }

  deleteTodo(event, id) {
    event.preventDefault();
    event.stopPropagation();
    this.props.deleteTodo(id)
  }

  textInputChanged(event) {
    this.setState({
      textInputValue: event.target.value
    });
  }

  createTodo() {
    const { createTodo } = this.props;
    if (!this.state.textInputValue.trim()) {
      return;
    }
    createTodo(this.state.textInputValue.trim());
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.createTodo();
    }
  }

  toggleTodoHandle(id, isChecked) {
    // isChecked not used
    this.props.toggleTodo(id);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.createTodoSuccess && nextProps.createTodoSuccess) {
      this.setState({
        textInputValue: ''
      });
    }
  }

  filterTodos() {
    const { filter, todos } = this.props;
    let filteredTodos = [];
    if (filter === 'all') {
      filteredTodos = todos;
    } else if (filter === 'uncomplete') {
      filteredTodos = todos.filter((todo) => !todo.complete)
    } else if (filter === 'completed') {
      filteredTodos = todos.filter((todo) => todo.complete)
    } else if (filter === 'deleted') {
      filteredTodos = todos.filter((todo) => todo.delete)
    } else {
      return todos;
    }
    return filteredTodos;
  }

  genStatusFilterBar() {
    const currentFilter = this.props.filter;
    const filters = [{
      status: 'all',
      label: '全部'
    }, {
      status: 'completed',
      label: '已完成'
    }, {
      status: 'uncomplete',
      label: '未完成'
    }, {
      status: 'deleted',
      label: '回收站'
    }];
    return (
      <div>
        {
          filters.map((filter) => {
            return <div style={currentFilter === filter.status ? selectedFilterStyle: normalFilterStyle}
                        key={filter.status}
                        onClick={() => this.props.filterTodo(filter.status)}>
                        {filter.label}
                  </div>
          })
        }
      </div>
    )
  }

  render () {
    const filteredTodos = this.filterTodos();
    return (
      <div>
        <Paper style={backgroundPaperStyle} zDepth={1}>
          <div style={todoPannelStyle}>

            {/* input text */}
            <TextField
              hintText="新建任务..."
              ref="taskInput"
              style={{width: "100%"}}
              value={this.state.textInputValue}
              onChange={this.textInputChanged}
              onKeyUp={this.handleKeyUp}
            />

            {/* todo list */}
            <List style={{textAlign: "left", paddingLeft: "-16px"}}>
              <Subheader>
                {this.genStatusFilterBar()}
              </Subheader>
              {
                filteredTodos.map((todo) => {
                  return  <ListItem primaryText={todo.text}
                                    style={todo.delete ? deletedTodoStyle : {}}
                                    key={todo.id}
                                    leftCheckbox={
                                      <Checkbox checked={todo.complete}
                                                onCheck={(event, isChecked) => this.toggleTodoHandle(todo.id, isChecked)}
                                      />
                                    }
                                    rightIcon={
                                      <DeleteIcon onClick={(event) => this.deleteTodo(event, todo.id)}/>
                                    }
                          />
                })
              }
            </List>

          </div>
        </Paper>
      </div>
    )
  }
}

Home.propTypes = {
  // props from redux store
  todos: PropTypes.arrayOf({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  createTodoSuccess: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,

  // actions
  createTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  loadTodos: PropTypes.func.isRequired,
  filterTodo: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    todos: state.todo.todos,
    filter: state.todo.filter,
    createTodoSuccess: state.todo.createTodoSuccess,
  }
}


export default connect(mapStateToProps, {
  ...todoActions
})(Home)
