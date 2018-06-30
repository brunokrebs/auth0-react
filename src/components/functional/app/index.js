import React from "react";
import { Route } from "react-router-dom";
import { Layout, Button, Menu } from "antd";

import Users from "../../../pages/users";
import Auth from "../../../helpers/auth";

const auth = new Auth();

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
            <Menu.Item key="1">{this.authenticationButtonNode()}</Menu.Item>
          </Menu>
        </Layout.Header>

        <Layout.Content>
          <Route exact path="/users" render={() => <Users />} />
          <Route
            exact
            path="/callback"
            render={props => {
              this.handleAuthentication(props);
              return <div>Loading...</div>;
            }}
          />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
