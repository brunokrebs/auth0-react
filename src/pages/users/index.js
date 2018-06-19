import React from "react";
import { Row } from "antd";
import { Col } from "antd";

import UsersList from "../../containers/users-list";

class Users extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <UsersList {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default Users;
