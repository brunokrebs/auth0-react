import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

import Sidebar from "../../ui/sidebar";
import Header from "../../ui/header";
import Members from "../../../pages/members";
import PrivateRoute from "../private-route";

const ContentWrapper = styled(Layout.Content)`
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 100vh;
`;

class App extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sidebar collapsed={this.state.collapsed} />
        <Layout>
          <Header onToggle={this.toggle} collapsed={this.state.collapsed} />
          <ContentWrapper>
            <PrivateRoute
              exact
              path="/members"
              component={Members}
              auth={this.props.auth}
              currentPath={this.props.history.location.pathname}
            />
          </ContentWrapper>
        </Layout>
      </Layout>
    );
  }
}

export default App;
