import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { globalAlertActions } from '../actions';

class Alert extends React.Component {
  render () {
    const { show, message, hideAlert } = this.props;
    return (
      <Snackbar
          open={show}
          message={message}
          autoHideDuration={2300}
          onRequestClose={hideAlert} />
    )
  }
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  hideAlert: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    show: state.globalAlert.show,
    message: state.globalAlert.message,
  }
}

export default connect(mapStateToProps, {
  ...globalAlertActions
})(Alert)
