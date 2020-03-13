import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { Layout, Table, Button, Input } from 'antd';

import { logout } from 'modules/auth/auth.actions';
import dataSource from './User-data.faker';

const { Search } = Input;
const { Content } = Layout;

class UserTable extends React.Component {
  onLogout = async () => {
    const callbackSuccess = () => {
      window.location.href = `${window.location.href}login`;
    };

    const callbackFail = error => {
      console.log(error);
    };

    this.props.logout({ callbackSuccess, callbackFail });
  };

  render() {
    const columns = [
      {
        title: 'Avatar',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (_text, record) => <img className="img-avatar" src={record.src} alt="" />,
      },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Age', dataIndex: 'age', key: 'age' },
      { title: 'Address', dataIndex: 'address', key: 'address' },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <span>Delete</span>,
      },
    ];

    return (
      <Content className="c-table-user">
        <div className="c-table-user__seach">
          <Search className="box" placeholder="Search..." />
        </div>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => <p>{record.description}</p>,
          }}
          dataSource={dataSource}
        />
        <Button type="secondary" className="btn-logout" onClick={this.onLogout}>
          Logout
        </Button>
      </Content>
    );
  }
}

UserTable.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(UserTable));
