import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import SubNavTittle from './SubNavTittle';

const { SubMenu } = Menu;
const { Sider } = Layout;

function NavbarLayout() {
  return (
    <Sider width={200}>
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} className="c-sider-menu">
        <SubMenu key="sub1" title={<SubNavTittle icon={<UserOutlined />} name="Subnav 1" />}>
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<SubNavTittle icon={<LaptopOutlined />} name="Subnav 2" />}>
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<SubNavTittle icon={<NotificationOutlined />} name="Subnav 3" />}>
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
}

export default NavbarLayout;
