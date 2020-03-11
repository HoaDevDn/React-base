import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthPage extends React.Component {
  componentDidMount() {
    const { history, user } = this.props;
    if (user) history.push('/');
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

AuthPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }),
};

AuthPage.defaultProps = {
  user: {},
};

const mapStateToProps = state => ({
  ...state.auth,
});

export default withRouter(connect(mapStateToProps, null)(AuthPage));
