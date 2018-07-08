import React from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Button, Menu } from "antd";
import styled from "styled-components";

import Users from "../../../pages/users";
import UsersNew from "../../../pages/users/new";
import UsersEdit from "../../../pages/users/edit";
import Auth from "../../../helpers/auth";

const auth = new Auth();

const ContentWrapper = styled(Layout.Content)`
  min-height: calc(100vh - 65px);
  width: 700px;
  margin: 20px auto;
`;

const HeaderWrapper = styled(Layout.Header)`
  background: #fff;
  padding: 0;
  display: flex;
  justify-content: flex-end;
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

  menuNode = () => {
    if (auth.isAuthenticated()) {
      return (
        <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/users/new">Add user</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Button
              onClick={() => {
                auth.logout();
              }}
            >
              Log Out
            </Button>
          </Menu.Item>
        </Menu>
      );
    } else {
      return (
        <Menu mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item key="1">
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Button
              onClick={() => {
                auth.login();
              }}
            >
              Log In
            </Button>
          </Menu.Item>
        </Menu>
      );
    }
  };

  render() {
    return (
      <Layout>
        <HeaderWrapper>{this.menuNode()}</HeaderWrapper>
        <ContentWrapper>
          <Route exact path="/users" render={props => <Users {...props} />} />
          <Route
            exact
            path="/users/new"
            render={props => <UsersNew {...props} />}
          />
          <Route
            exact
            path="/users/:id/edit"
            render={props => <UsersEdit {...props} />}
          />
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
