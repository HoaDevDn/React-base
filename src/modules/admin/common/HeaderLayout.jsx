import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Dropdown, Avatar, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogoutOutlined } from '@ant-design/icons';
import { logout } from 'modules/auth/auth.actions';

const { Header } = Layout;

function HeaderLayout(props) {
  const onLogout = async () => {
    const callbackSuccess = () => {
      window.location.href = `${window.location.href}login`;
    };

    const callbackFail = error => {
      if (error.message) message.error(error.message);
    };

    props.logout({ callbackSuccess, callbackFail });
  };

  const menu = () => (
    <Menu onClick={onLogout}>
      <Menu.Item key="1">
        <LogoutOutlined />
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="header">
      <div className="c-logo">
        <img
          src="https://jobchat-production.s3.ap-southeast-1.amazonaws.com/iconGroup/RhTlDpzljwwdyui0SPrugsR7.blob"
          alt=""
        />
      </div>
      <Dropdown overlay={menu} className="c-menu-head" placement="bottomRight">
        <span>
          <Avatar
            className="u-ml-10"
            src="https://jobchat-production.s3.ap-southeast-1.amazonaws.com/avatarUser/9MddkuT0iBRE6CAPnBjF1fciYo42"
          />
        </span>
      </Dropdown>
    </Header>
  );
}

HeaderLayout.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default connect(null, mapDispatchToProps)(HeaderLayout);
