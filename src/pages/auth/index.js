import React from "react";
import { Row } from "antd";
import { Col } from "antd";

import AuthContainer from "../../containers/auth";

class Auth extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <AuthContainer {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default Auth;
