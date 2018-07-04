import React from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Button, Menu } from "antd";
import styled from "styled-components";

import Users from "../../../pages/users";
import UsersNew from "../../../pages/users/new";
import Auth from "../../../helpers/auth";

const auth = new Auth();

const ContentWrapper = styled(Layout.Content)`
  min-height: calc(100vh - 65px);
`;

class App extends React.Component {
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  };

  authenticationButtonNode = () => {
    return auth.isAuthenticated() ? (
      <Button
        onClick={() => {
          auth.logout();
        }}
      >
        Log Out
      </Button>
    ) : (
      <Button
        onClick={() => {
          auth.login();
        }}
      >
        Log In
      </Button>
    );
  };

  render() {
    return (
      <Layout>
        <Layout.Header
          style={{
            background: "#fff",
            padding: "0",
            display: "flex",
            justifyContent: "flex-end"
          }}
        >
          <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
            <Menu.Item key="1">
              <Link to="/users/new">Add user</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/users">Users</Link>
            </Menu.Item>
            <Menu.Item key="3">{this.authenticationButtonNode()}</Menu.Item>
          </Menu>
        </Layout.Header>
        <ContentWrapper>
          <Route exact path="/users" render={() => <Users />} />
          <Route exact path="/users/new" render={() => <UsersNew />} />
          <Route
            exact
            path="/callback"
            render={props => {
              this.handleAuthentication(props);
              return <div>Loading...</div>;
            }}
          />
        </ContentWrapper>
      </Layout>
    );
  }
}

export default App;
