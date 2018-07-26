import React from "react";
import { Row, Col } from "antd";

import MembersList from "../../containers/members-list";

class Members extends React.Component {
  render() {
    return (
      <Row>
        <Col span={24}>
          <MembersList {...this.props} />
        </Col>
      </Row>
    );
  }
}

export default Members;
