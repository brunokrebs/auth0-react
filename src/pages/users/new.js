import React from "react";
import { Row } from "antd";
import { Col } from "antd";

import NewUserForm from "../../containers/new-user-form";

class Users extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <NewUserForm {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default Users;
