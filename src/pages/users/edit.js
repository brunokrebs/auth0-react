import React from "react";
import { Row } from "antd";
import { Col } from "antd";

import EditUserForm from "../../containers/edit-user-form";

class UserEdit extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <EditUserForm {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default UserEdit;
