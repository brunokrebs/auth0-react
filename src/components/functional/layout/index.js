import React from "react";
import { Layout } from "antd";
import styled from "styled-components";

import Header from "../../ui/header";
import Members from "../../../pages/members";
import PrivateRoute from "../private-route";

const ContentWrapper = styled(Layout.Content)`
  margin: 24px 16px;
  padding: 24px;
  min-height: 100vh;
  width: 800px;
  margin: 24px auto;
`;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Header />
          <ContentWrapper>
            <PrivateRoute
              exact
              path="/"
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
