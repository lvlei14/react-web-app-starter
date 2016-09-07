import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { history } from '../services';
import { loadAuthByJwtToken } from '../actions/auth';

export default function requireAuthentication(ReactComponent) {

  class AuthenticatedComponent extends Component {

    componentWillMount () {
      if (!this.props.user) {
        this.props.loadAuthByJwtToken();
      }
    }

    componentWillReceiveProps (nextProps) {
      let redirectAfterLogin = this.props.location.pathname;
      if (!this.props.loadAuthFailed && nextProps.loadAuthFailed) {
        history.replace(`/login?next=${redirectAfterLogin}`);
      }
      if (this.props.user && !nextProps.user) {
        history.replace('/login');
      }
    }

    render () {
      return (
        <div>
          { this.props.loadingAuth ? null : <ReactComponent {...this.props}/> }
        </div>
      )
    }
  }

  AuthenticatedComponent.propTypes = {
    loadingAuth: PropTypes.bool.isRequired,
    loadAuthFailed: PropTypes.bool.isRequired,
    user: PropTypes.object,
    loadAuthByJwtToken: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    loadingAuth: state.auth.loadingAuth,
    loadAuthFailed: state.auth.loadAuthFailed,
    user: state.auth.user,
  });

  return connect(mapStateToProps, {
    loadAuthByJwtToken
  })(AuthenticatedComponent);

}
