import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

class Auth extends React.Component {
  render() {
    return (
      <LayoutWrapper>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            this.props.auth.login();
          }}
        >
          Sign in using Auth0
        </Button>
      </LayoutWrapper>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.object
};

export default Auth;
