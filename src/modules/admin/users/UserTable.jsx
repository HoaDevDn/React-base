import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Table, Input, Spin, Popconfirm, message, Form, Button, Modal, Checkbox } from 'antd';
import { LoadingOutlined, EditOutlined, DeleteOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { findIndex } from 'lodash';

import { getRules, getValuesChangeTwoObj } from 'helpers';
import UserService from './Users.services';
import SubInfo from './SubInfo';

const userService = new UserService();
const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

class UserTable extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingGetListUser: false,
      isLoadingUpdateUser: false,
      listUsers: [],
      visible: false,
      updatedUser: {},
    };
  }

  async componentDidMount() {
    this.getListUser();
  }

  getListUser = async () => {
    try {
      this.setState({ isLoadingGetListUser: true });
      let listUsers = await userService.getListUser();
      listUsers = listUsers.map(user => ({ ...user, key: user.id }));
      this.setState({ listUsers });
    } catch (error) {
      if (error.message) message.error(error.message);
    } finally {
      this.setState({ isLoadingGetListUser: false });
    }
  };

  deleteUser = async user => {
    const hide = message.loading('Action in progress..', 0);
    try {
      await userService.deleteUser(user.id, user.role);
      let { listUsers } = this.state;
      listUsers = listUsers.filter(item => item.id !== user.id);
      this.setState({ listUsers });
    } catch (error) {
      if (error.message) message.error(error.message);
    } finally {
      hide();
    }
  };

  showModalUpdate = updatedUser => {
    this.setState({ visible: true, updatedUser });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  updateUserInfo = async data => {
    const { listUsers, updatedUser } = this.state;
    const dataChange = getValuesChangeTwoObj(updatedUser, data);
    try {
      this.setState({ isLoadingUpdateUser: true });
      await userService.updateUser(updatedUser.id, dataChange, updatedUser.role);
      const newData = { ...updatedUser, ...dataChange };
      const index = findIndex(listUsers, item => item.id === updatedUser.id);
      if (index !== -1) {
        listUsers.splice(index, 1, newData);
        this.setState({ listUsers, updatedUser: {} });
      }
      message.success('Updated successful');
    } catch (error) {
      if (error.message) message.error(error.message);
    } finally {
      this.setState({ isLoadingUpdateUser: false, visible: false });
    }
  };

  render() {
    const text = 'Are you sure to delete this user?';
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (_text, record) => <img className="img-avatar" src={record.avatar} alt="" />,
      },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      { title: 'Role', dataIndex: 'role', key: 'role', align: 'center' },
      { title: 'Phone number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_text, record) => (
          <span>
            <EditOutlined className="u-pointer" onClick={() => this.showModalUpdate(record)} />
            <Popconfirm
              placement="leftBottom"
              title={text}
              onConfirm={() => this.deleteUser(record)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className="delete-icon" />
            </Popconfirm>
          </span>
        ),
      },
    ];

    return this.state.isLoadingGetListUser ? (
      <Spin indicator={antIcon} />
    ) : (
      <div className="c-table-user">
        <Modal
          title="Update information"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
        >
          <Form key={this.state.visible} initialValues={this.state.updatedUser} onFinish={this.updateUserInfo}>
            <Form.Item name="name" rules={[getRules(this.props, 'name', 'required')]}>
              <Input prefix={<UserOutlined />} placeholder="name..." />
            </Form.Item>
            <Form.Item name="phoneNumber">
              <Input prefix={<PhoneOutlined />} placeholder="Phone number..." />
            </Form.Item>
            <Form.Item name="isTeaching" valuePropName="checked">
              <Checkbox>Teaching</Checkbox>
            </Form.Item>
            <Form.Item name="isBlocked" valuePropName="checked">
              <Checkbox>Blocked</Checkbox>
            </Form.Item>
            <Form.Item className="u-text-center u-mb-0">
              <Button type="primary" htmlType="submit" loading={this.state.isLoadingUpdateUser}>
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="c-table-user__seach">
          <Search className="box" placeholder="Search..." />
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => <SubInfo user={record} />,
          }}
          dataSource={this.state.listUsers}
        />
      </div>
    );
  }
}

UserTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
};

const mapStateToProps = state => ({
  ...state.auth,
});

export default withTranslation()(connect(mapStateToProps)(UserTable));
