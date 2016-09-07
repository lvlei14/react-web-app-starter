import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { navigate, updateRouterState, resetErrorMessage, authActions } from '../actions';
import Alert from '../components/Alert';

import AppBar from 'material-ui/AppBar';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';


class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleDismissClick = this.handleDismissClick.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  handleChange(nextValue) {
    this.props.navigate(`/${nextValue}`)
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  logout() {
    this.props.logout();
  }

  getHeaderRightBars() {
    return (
      <span>
        <IconMenu iconButtonElement={
          <Badge
            badgeContent={3}
            primary={true}
            badgeStyle={{width: 17, height: 17}}
            style={{padding: 0}}
          >
            <IconButton tooltip="未读消息">
              <NotificationsIcon />
            </IconButton>
          </Badge>
        }>
          <MenuItem primaryText="信息1" />
          <MenuItem primaryText="信息2" />
          <MenuItem primaryText="信息3" />
        </IconMenu>
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        >
          <MenuItem primaryText="个人信息" />
          <Divider />
          <MenuItem primaryText="退出" onClick={this.logout}/>
        </IconMenu>
      </span>
    );
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <AppBar
          title="Timer"
          iconElementRight={this.getHeaderRightBars()}
        />
        <Alert />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux

  // Injected by React Router
  children: PropTypes.node,
  logout: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps, {
  navigate,
  updateRouterState,
  resetErrorMessage,
  logout: authActions.logout
})(App)
