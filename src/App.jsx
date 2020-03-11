import React from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import SwitchRouter from 'router/SwitchRouter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUser as setUserAction } from 'modules/auth/auth.actions';
import AuthService from 'modules/auth/auth.services';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
    this.authService = new AuthService();
  }

  componentDidMount() {
    if (!this.props.user) {
      const setUserStore = currentUser => {
        if (currentUser && currentUser.emailVerified) this.props.setUser(currentUser);
        this.setState({ isLoading: false });
      };
      this.authService.getAuth(setUserStore);
    } else this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    return <div className="App">{isLoading ? <div>Loading...</div> : <SwitchRouter history={history} />}</div>;
  }
}

App.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  user: PropTypes.shape({}),
  setUser: PropTypes.func.isRequired,
};

App.defaultProps = {
  history: {},
  user: {},
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ setUser: setUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
