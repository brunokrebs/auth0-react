import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";

import Users from "../../../pages/users";

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Header>Layout.Header</Layout.Header>
        <Layout.Content>
          <Route exact path="/" render={() => <Users />} />
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
