import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import styled from "styled-components";

const LogoWrapper = styled.div`
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
`;

class Sidebar extends React.Component {
  render() {
    return (
      <Layout.Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <LogoWrapper className="logo" />
        <Menu theme="dark" mode="inline">
          <Menu.Item key="1">
            <Icon type="user" />
            <span>
              <Link to="/users">Users</Link>
            </span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
    );
  }
}

export default Sidebar;
