import React from "react";
import { Spin } from "antd";
import { Route, Redirect } from "react-router-dom";
import styled from "styled-components";

import Auth from "../../../pages/auth";

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class PublicLayout extends React.Component {
  handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication(this.props.authenticate);
    }
  };

  render() {
    if (window.location.pathname === "/callback") {
      return (
        <Route
          exact
          path="/callback"
          render={props => {
            this.handleAuthentication(props);
            return (
              <LayoutWrapper>
                <Spin size="large" />
              </LayoutWrapper>
            );
          }}
        />
      );
    }

    if (this.props.history.location.pathname !== "/auth") {
      return <Redirect to="/auth" />;
    }

    return <Route exact path="/auth" render={() => <Auth {...this.props} />} />;
  }
}

export default PublicLayout;
