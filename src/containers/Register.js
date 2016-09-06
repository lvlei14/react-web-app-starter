import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { history } from '../services';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { registerActions } from '../actions';


const containerStyle = {
  width: "50%",
  margin: "0 auto",
  padding: "17px 30px",
  maxWidth: "330px",
  marginTop: "30px",
  textAlign: "center"
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleConformedPasswordInput = this.handleConformedPasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.register = this.register.bind(this);

    this.state = {
      username: '',
      password: '',
      conformedPassword: '',
      email: '',
      errorMessages: {
        username: '',
        password: '',
        conformedPassword: '',
        email: '',
      }
    };
  }

  componentDidMount() {
    this.refs.usernameInput.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.registerSuccess && nextProps.registerSuccess) {
      history.replace('/login');
    }
  }

  handleUsernameInput(event) {
    this.setState({username: event.target.value});
  }

  handleConformedPasswordInput(event) {
    this.setState({conformedPassword: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  handleEmailInput(event) {
    this.setState({email: event.target.value});
  }

  register() {
    const registerInfo = this.state;
    const lackedField = ['username', 'password', 'conformedPassword', 'email'].filter((field) => !registerInfo[field])
    const errorMsg = {};
    if (lackedField && lackedField.length) {
      const errorMessageMap = {
        username: '请输入用户名',
        password: '请输入密码',
        conformedPassword: '请再次输入密码',
        email: '请输入邮箱',
      };
      lackedField.forEach((field) => {errorMsg[field] = errorMessageMap[field]});
      this.setState({errorMessages: errorMsg});
    } else if (this.state.password !== this.state.conformedPassword) {
      errorMsg.conformedPassword = "确认密码输入有误";
      this.setState({errorMessages: errorMsg});
    } else {
      this.setState({errorMessages: {}});
      console.dir("注册:" + this.state);
      this.props.register(this.state);
    }
  }

  render () {
    return (
      <div>
        <Paper style={containerStyle}>
          <div>开启规划、记录、分享之旅</div>
          <TextField
            id="username"
            ref="usernameInput"
            hintText="请输入用户名"
            floatingLabelText="用户名"
            errorText={this.state.errorMessages['username']}
            value={this.state.username}
            style={{width: "100%"}}
            onChange={this.handleUsernameInput}
          />
          <br />
          <TextField
            id="email"
            hintText="请输入邮箱"
            floatingLabelText="邮箱"
            errorText={this.state.errorMessages['email']}
            value={this.state.email}
            style={{width: "100%"}}
            onChange={this.handleEmailInput}
          />
          <br />
          <TextField
            id="password"
            hintText="请输入密码"
            type="password"
            floatingLabelText="密码"
            errorText={this.state.errorMessages['password']}
            value={this.state.password}
            style={{width: "100%"}}
            onChange={this.handlePasswordInput}
          />
          <br />
          <TextField
            id="conformedPassword"
            hintText="再次输入密码"
            type="password"
            floatingLabelText="确认密码"
            errorText={this.state.errorMessages['conformedPassword']}
            value={this.state.conformedPassword}
            style={{width: "100%"}}
            onChange={this.handleConformedPasswordInput}
          />
          <br />
          <RaisedButton
            label="注册"
            fullWidth={true}
            primary={true}
            onClick={this.register}
            style={{marginTop: "17px"}}/>
        </Paper>
      </div>
    )
  }
}

Register.propTypes = {
  registerSuccess: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
  // actions
  register: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  return {
    registerSuccess: state.register.registerSuccess,
    errMessage: state.register.errMessage,
  }
}


export default connect(mapStateToProps, {
  ...registerActions
})(Register)
