/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
// import { Button, Spin } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons';

import { logout } from 'modules/auth/auth.actions';
// import { rConfig } from 'configs';
// import logo from 'logo.svg';
// import UserService from './Home.services';
// import { rConfig } from 'configs';
// import logo from 'logo.svg';
// import UserService from './Home.services';

// const userService = new UserService();
// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Home extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     listUsers: [],
  //     userInfo: null,
  //     isLoadingAddUser: false,
  //     isLoadingGetInfo: false,
  //   };
  // }

  // async componentDidMount() {
  //   userService.listenEventUsers(
  //     response => {
  //       let { listUsers } = this.state;
  //       const data = { ...response.doc.data(), id: response.doc.id };
  //       if (response.type === 'added') listUsers = [...listUsers, data];
  //       else {
  //         const index = listUsers.findIndex(item => item.id === data.id);
  //         if (response.type === 'modified' && index !== -1) listUsers.splice(index, 1, data);
  //         if (response.type === 'removed' && index !== -1) listUsers.splice(index, 1);
  //       }
  //       this.setState({ listUsers });
  //     },
  //     () => {},
  //   );
  // }

  // componentWillUnmount() {
  //   userService.offListenEventUsers();
  // }

  // onLogout = async () => {
  //   const callbackSuccess = () => {
  //     window.location.href = `${window.location.href}login`;
  //   };

  //   const callbackFail = error => {
  //     console.log(error);
  //   };

  //   this.props.logout({ callbackSuccess, callbackFail });
  // };

  // addInfo = async () => {
  //   try {
  //     const date = new Date();
  //     const timestamp = date.getTime();
  //     const payload = {
  //       name: `hoa - ${timestamp}`,
  //       email: `phuhoa${timestamp}@gmail.com`,
  //       password: 'abc123',
  //     };
  //     this.setState({ isLoadingAddUser: true });
  //     await userService.createUser(payload.name, payload.email, payload.password);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     this.setState({ isLoadingAddUser: false });
  //   }
  // };

  // deleteUser = async id => {
  //   try {
  //     await userService.deleteUser(id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getUser = async id => {
  //   try {
  //     this.setState({ isLoadingGetInfo: true });
  //     const userInfo = await userService.getUser(id);
  //     this.setState({ userInfo });
  //   } catch (error) {
  //     console.log('error', error);
  //   } finally {
  //     this.setState({ isLoadingGetInfo: false });
  //   }
  // };

  // changeLang = language => {
  //   this.props.i18n.changeLanguage(language);
  // };

  render() {
    return (
      <Layout className="c-main-admin">
        <Header className="header">
          <div className="logo" />
          <Menu mode="horizontal" defaultSelectedKeys={['2']} style={{ lineHeight: '50px' }}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <UserOutlined />
                    subnav 1
                  </span>
                }
              >
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <LaptopOutlined />
                    subnav 2
                  </span>
                }
              >
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <NotificationOutlined />
                    subnav 3
                  </span>
                }
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  // t: PropTypes.func.isRequired,
  // logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Home));
