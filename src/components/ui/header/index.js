import React from "react";
import { Layout, Button } from "antd";
import styled from "styled-components";

import MemberNewForm from "../../../containers/member-new-form";

const HeaderWrapper = styled(Layout.Header)`
  background: #fff !important;
  padding: 0 !important;
  display: flex;
  justify-content: flex-end;
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
