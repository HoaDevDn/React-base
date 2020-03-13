import React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';
import { HeaderLayout, NavbarLayout } from 'modules/admin/common';
import UserTable from 'modules/admin/users/UserTable';

class Home extends React.Component {
  render() {
    return (
      <Layout className="c-main-admin">
        <HeaderLayout />
        <Layout>
          <NavbarLayout />
          <Layout className="c-main-admin__layout">
            <Route path="/" component={UserTable} />
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
