import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withTranslation, useTranslation } from 'react-i18next';
import { getRules } from 'helpers';
import { toast } from 'react-toastify';

function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  toast('Welcome to login!');
  const onLogin = ({ email, password }) => {
    const callbackSuccess = user => {
      if (!user.emailVerified) {
        console.log('Need to veriry email');
        setIsLoading(false);
        return;
      }

      props.history.push('/');
    };

    const callbackFail = () => {
      setIsLoading(false);
    };

    setIsLoading(true);
    props.login({ email, password, callbackSuccess, callbackFail });
  };

  const redirectToRegister = () => {
    props.history.push('/register');
  };

  return (
    <Form name="normal_login" className="c-land-form" onFinish={onLogin}>
      <div className="u-text-center">
        <img
          className="c-land-form__logo"
          src="https://jobchat-production.s3.ap-southeast-1.amazonaws.com/iconGroup/RhTlDpzljwwdyui0SPrugsR7.blob"
          alt=""
        />
      </div>
      <Form.Item name="email" rules={[getRules(props, t('fields.email'), 'required')]}>
        <Input
          className="u-border-rounded"
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item name="password" rules={[getRules(props, t('fields.password'), 'required')]}>
        <Input
          className="u-border-rounded"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="c-land-form__button" loading={isLoading}>
          Log in
        </Button>
        <div className="c-land-form__option">
          <span>
            Or
            <button className="o-btn-text" onClick={redirectToRegister} type="button">
              register now!
            </button>
          </span>
          <span>
            <button className="o-btn-text" type="button">
              Forgot password
            </button>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  login: PropTypes.func.isRequired,
};

export default withTranslation()(Login);
