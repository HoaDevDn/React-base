import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { withTranslation, useTranslation } from 'react-i18next';
import { getRules } from 'helpers';
import AuthService from 'modules/auth/auth.services';

function Register(props) {
  const authService = new AuthService();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const onRegister = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await authService.register(email, password);
      setTimeout(() => {
        redirectToLogin();
      }, 100);
    } catch (err) {
      setIsLoading(false);
      // eslint-disable-next-line no-alert
      alert(err.message);
    }
  };

  const redirectToLogin = () => {
    props.history.push('/login');
  };

  const [form] = Form.useForm();

  return (
    <Form form={form} name="register" className="c-land-form" onFinish={onRegister}>
      <div className="u-text-center">
        <img
          className="c-land-form__logo"
          src="https://jobchat-production.s3.ap-southeast-1.amazonaws.com/iconGroup/RhTlDpzljwwdyui0SPrugsR7.blob"
          alt=""
        />
      </div>
      <Form.Item
        name="email"
        rules={[getRules(props, t('fields.email'), 'email'), getRules(props, t('fields.email'), 'required')]}
      >
        <Input
          className="u-border-rounded"
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item name="password" rules={[getRules(props, t('fields.password'), 'required')]} hasFeedback>
        <Input.Password
          className="u-border-rounded"
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="passwordConfirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          getRules(props, t('fields.passwordConfirm'), 'required'),
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve();
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password
          className="u-border-rounded"
          placeholder="Confirm Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        hasFeedback
        rules={[
          () => ({
            validator(rule, value) {
              if (value) return Promise.resolve();
              return Promise.reject('');
            },
          }),
        ]}
      >
        <Checkbox>
          I have read the <a href="#top">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className="c-land-form__button" type="primary" htmlType="submit" loading={isLoading}>
          Register
        </Button>
        <div className="c-land-form__option">
          <span>
            Or
            <button className="o-btn-text" onClick={redirectToLogin} type="button">
              login now!
            </button>
          </span>
        </div>
      </Form.Item>
    </Form>
  );
}

Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
};

export default withTranslation()(Register);
