import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { history } from '../services';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { authActions } from '../actions';


const containerStyle = {
  width: "50%",
  margin: "0 auto",
  padding: "17px 30px",
  maxWidth: "330px",
  marginTop: "30px",
  textAlign: "center"
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.login = this.login.bind(this);

    this.state = {
      username: '',
      password: '',

      errorMessages: {
        username: '',
        password: '',
      }
    };
  }

  componentDidMount() {
    this.refs.usernameInput.focus();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.loginSuccess && nextProps.loginSuccess) {
      let { next } = this.props.location.query;
      if (next) {
        console.log()
        history.replace(`${next}`);
      } else {
        history.replace('/');
      }
    }
  }

  handleUsernameInput(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordInput(event) {
    this.setState({password: event.target.value});
  }

  login() {
    const user = this.state;
    const lackedField = ['username', 'password'].filter((field) => !user[field])
    const errorMsg = {};
    if (lackedField && lackedField.length) {
      const errorMessageMap = {
        username: '请输入用户名',
        password: '请输入密码',
      };
      lackedField.forEach((field) => {errorMsg[field] = errorMessageMap[field]});
      this.setState({errorMessages: errorMsg});
    } else {
      this.setState({errorMessages: {}});
      const { username, password } = this.state;
      this.props.login({ username, password });
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
          <RaisedButton
            label="登录"
            fullWidth={true}
            primary={true}
            onClick={this.login}
            style={{marginTop: "17px"}}/>
        </Paper>
      </div>
    )
  }
}

Login.propTypes = {
  loginSuccess: PropTypes.bool.isRequired,
  errMessage: PropTypes.string.isRequired,
  // actions
  login: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    loginSuccess: state.auth.loginSuccess,
    user: state.auth.user,
    errMessage: state.auth.errMessage,
  }
}


export default connect(mapStateToProps, {
  ...authActions,
})(Login)
