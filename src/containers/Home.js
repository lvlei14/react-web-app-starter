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


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.createTodo = this.createTodo.bind(this);
    this.textInputChanged = this.textInputChanged.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.state = {
      textInputValue: '',
    };
  }

  componentDidMount() {
    this.refs.taskInput.focus();
    // ReactDOM.findDOMNode(this.refs.taskInput).focus();
  }

  deleteTodo(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  textInputChanged(event) {
    this.setState({
      textInputValue: event.target.value
    });
  }

  createTodo() {
    const { createTodo } = this.props;
    createTodo(this.state.textInputValue);
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.createTodo();
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render () {
    // console.log(this.props);
    const { todos } = this.props;
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
              <Subheader>所有|已完成|未完成</Subheader>
              {
                todos.map((todo) => {
                  return  <ListItem primaryText={todo.text}
                                    key={todo.id}
                                    leftCheckbox={<Checkbox />}
                                    rightIcon={<DeleteIcon onClick={this.deleteTodo}/>}
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
  createTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  filter: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todo.todos,
    filter: state.todo.filter
  }
}

export default connect(mapStateToProps, {
  ...todoActions
})(Home)
