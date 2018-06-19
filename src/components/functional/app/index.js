import React from "react";
import { Route } from "react-router-dom";
import Layout from "antd/lib/layout";

import Content from "../../ui/content";
import Users from "../../../pages/users";

export default class App extends React.Component {
  render() {
    return (
      <Layout>
        <Layout>
          <Layout>
            <Content>
              <Route exact path="/" render={() => <Users />} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {};
