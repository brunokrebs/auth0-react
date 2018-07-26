import React from "react";
import { Layout, Icon } from "antd";
import styled from "styled-components";

const TriggerWrapper = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
`;

class Header extends React.Component {
  render() {
    return (
      <Layout.Header style={{ background: "#fff", padding: 0 }}>
        <TriggerWrapper
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.onToggle}
        />
      </Layout.Header>
    );
  }
}

export default Header;
