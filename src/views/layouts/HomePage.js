import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogin: false };
  }

  componentDidMount() {
    const { history, user } = this.props;
    this.setState({ isLogin: !!user });
    if (!user) history.push('/login');
  }

  render() {
    const { children } = this.props;
    const { isLogin } = this.state;
    return isLogin ? <div>{children}</div> : '';
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }),
};

HomePage.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  ...state.auth,
});

export default withRouter(connect(mapStateToProps, null)(HomePage));
