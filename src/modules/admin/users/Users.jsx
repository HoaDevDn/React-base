import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { Button, Spin, Layout } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { logout } from 'modules/auth/auth.actions';
import { rConfig } from 'configs';
import logo from 'logo.svg';
import UserService from './Users.services';

const userService = new UserService();
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Content } = Layout;

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      listUsers: [],
      userInfo: null,
      isLoadingAddUser: false,
      isLoadingGetInfo: false,
    };
  }

  async componentDidMount() {
    userService.listenEventUsers(
      response => {
        let { listUsers } = this.state;
        const data = { ...response.doc.data(), id: response.doc.id };
        if (response.type === 'added') listUsers = [...listUsers, data];
        else {
          const index = listUsers.findIndex(item => item.id === data.id);
          if (response.type === 'modified' && index !== -1) listUsers.splice(index, 1, data);
          if (response.type === 'removed' && index !== -1) listUsers.splice(index, 1);
        }
        this.setState({ listUsers });
      },
      () => {},
    );
  }

  componentWillUnmount() {
    userService.offListenEventUsers();
  }

  onLogout = async () => {
    const callbackSuccess = () => {
      window.location.href = `${window.location.href}login`;
    };

    const callbackFail = error => {
      console.log(error);
    };

    this.props.logout({ callbackSuccess, callbackFail });
  };

  addInfo = async () => {
    try {
      const date = new Date();
      const timestamp = date.getTime();
      const payload = {
        name: `hoa - ${timestamp}`,
        email: `phuhoa${timestamp}@gmail.com`,
        password: 'abc123',
      };
      this.setState({ isLoadingAddUser: true });
      await userService.createUser(payload.name, payload.email, payload.password);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoadingAddUser: false });
    }
  };

  deleteUser = async id => {
    try {
      await userService.deleteUser(id);
    } catch (error) {
      console.log(error);
    }
  };

  getUser = async id => {
    try {
      this.setState({ isLoadingGetInfo: true });
      const userInfo = await userService.getUser(id);
      this.setState({ userInfo });
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setState({ isLoadingGetInfo: false });
    }
  };

  changeLang = language => {
    this.props.i18n.changeLanguage(language);
  };

  render() {
    const {
      t,
      user: { email },
    } = this.props;

    return (
      <Content className="c-table-user">
        <div className="c-home-page">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Your Email: {email}</p>
            {this.state.isLoadingGetInfo ? (
              <Spin indicator={antIcon} />
            ) : (
              <>
                {this.state.userInfo ? (
                  <div className="c-user-info">
                    <p>User Info</p>
                    <p>id: {this.state.userInfo.id}</p>
                    <p>email: {this.state.userInfo.email}</p>
                  </div>
                ) : (
                  ''
                )}
              </>
            )}
            <table className="c-user-table">
              <thead>
                <tr>
                  <th>{t('homePage.name')}</th>
                  <th>{t('homePage.option')}</th>
                  <th>{t('homePage.option')}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.listUsers.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <Button type="secondary" className="btn-logout" onClick={() => this.getUser(item.id)}>
                        Get info
                      </Button>
                    </td>
                    <td>
                      <button className="btn-logout" type="button" onClick={() => this.deleteUser(item.id)}>
                        Delete user
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="c-change-language">
              <button type="button" onClick={() => this.changeLang(rConfig.lang.en)}>
                EN
              </button>
              <button type="button" onClick={() => this.changeLang(rConfig.lang.vi)}>
                VN
              </button>
            </div>
            <div className="u-flex">
              <Button
                type="secondary"
                className="btn-logout"
                onClick={this.addInfo}
                loading={this.state.isLoadingAddUser}
              >
                Add User
              </Button>
              <button className="btn-logout" type="button" onClick={this.onLogout}>
                Logout
              </button>
            </div>
          </header>
        </div>
      </Content>
    );
  }
}

Users.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  t: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Users));
