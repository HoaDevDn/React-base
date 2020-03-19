import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import SubNavTittle from './SubNavTittle';

const { SubMenu } = Menu;
const { Sider } = Layout;

function NavbarLayout() {
  return (
    <Sider width={200} className="c-nav-admin">
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} className="c-sider-menu">
        <SubMenu key="sub1" title={<SubNavTittle icon={<UserOutlined />} name="User manage" />}>
          <Menu.Item key="1">Teacher</Menu.Item>
          <Menu.Item key="2">Learner</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default NavbarLayout;
