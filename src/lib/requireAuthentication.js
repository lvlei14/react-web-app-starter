import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { loadAuthByJwtToken } from '../actions/auth';

export default function requireAuthentication(ReactComponent) {

  class AuthenticatedComponent extends Component {

    componentWillMount () {
      if (!this.props.user) {
        this.props.loadAuthByJwtToken();
      }
    }

    componentWillReceiveProps (nextProps) {
      if (!this.props.loadAuthFailed && nextProps.loadAuthFailed) {
        let redirectAfterLogin = this.props.location.pathname;
        // TODO redirectAfterLogin not available
        this.props.dispatch(pushState(null, `/login?next=${redirectAfterLogin}`));
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
    user: state.auth.user
  });

  return connect(mapStateToProps, {
    loadAuthByJwtToken
  })(AuthenticatedComponent);

}
