import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { Layout, Table, Button } from 'antd';
import { logout } from 'modules/auth/auth.actions';

const { Content } = Layout;

class Home extends React.Component {
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
        title: 'Avatar1',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, record) => <img className="img-avatar" src={record.src} alt="" />,
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

    const data = [
      {
        key: 1,
        src: 'https://gamek.mediacdn.vn/2019/4/10/photo-1-15548916376021451799217.jpg',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      },
      {
        key: 2,
        src: 'https://st.quantrimang.com/photos/image/2019/07/31/hinh-nen-17.jpg',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      },
      {
        key: 3,
        src: 'https://img.thuthuatphanmem.vn/uploads/2018/10/16/anh-dep-luffy-be_101532746.jpg',
        name: 'Not Expandable',
        age: 29,
        address: 'Jiangsu No. 1 Lake Park',
        description: 'This not expandable',
      },
      {
        key: 4,
        src: 'https://anhnendep.net/wp-content/uploads/2018/11/hinh-nen-luffy-gear-4-one-piece-hd-10.jpg',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
    ];

    return (
      <Content className="c-table-user">
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => <p>{record.description}</p>,
          }}
          dataSource={data}
        />
        <Button type="secondary" className="btn-logout" onClick={this.onLogout}>
          Logout
        </Button>
      </Content>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  user: PropTypes.shape({ email: PropTypes.string }).isRequired,
  i18n: PropTypes.shape({ changeLanguage: PropTypes.func }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(Home));
