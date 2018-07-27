import React from "react";
import { Layout, Icon, Button } from "antd";
import styled from "styled-components";

import MemberNewForm from "../../../containers/member-new-form";

const TriggerWrapper = styled(Icon)`
  font-size: 18px;
  line-height: 64px;
  cursor: pointer;
  transition: color 0.3s;
`;

const HeaderWrapper = styled(Layout.Header)`
  background: #fff !important;
  padding: 0 !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px !important;
`;

class Header extends React.Component {
  state = { isDrawerVisible: false };

  toggleDrawerVisibility = item => {
    this.setState({
      isDrawerVisible: !this.state.isDrawerVisible
    });
  };

  render() {
    return [
      <HeaderWrapper key={1}>
        <TriggerWrapper
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.onToggle}
        />
        <Button type="primary" onClick={this.toggleDrawerVisibility}>
          Add new member
        </Button>
      </HeaderWrapper>,
      <MemberNewForm
        key={2}
        toggleDrawerVisibility={this.toggleDrawerVisibility}
        visible={this.state.isDrawerVisible}
      />
    ];
  }
}

export default Header;
