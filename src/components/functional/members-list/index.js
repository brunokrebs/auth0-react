import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItemWrapper = styled(List.Item)`
  margin: 0 0 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e8e8e8 !important;

  .ant-list-item-meta-title {
    margin: 0;
  }
`;

class MembersList extends React.Component {
  componentDidMount() {
    this.props.fetchMembers();
    this.props.joinChannel(); // join the member channel
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel); // leave the member channel
  }

  errorNode = () => {
    return this.props.membersUi.get("loadError");
  };

  listNode = () => (
    <List
      loading={this.props.membersUi.get("loading")}
      dataSource={this.props.members.toArray()}
      renderItem={item => (
        <ListItemWrapper
          actions={[
            <Link to={`/members/${item.id}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>,
            <Button
              type="danger"
              onClick={() => this.props.deleteMember(item.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta title={item.name} />
        </ListItemWrapper>
      )}
    />
  );

  render() {
    return this.props.membersUi.get("loadError")
      ? this.errorNode()
      : this.listNode();
  }
}

MembersList.propTypes = {
  fetchMembers: PropTypes.func,
  members: PropTypes.object,
  membersUi: PropTypes.object
};

export default MembersList;
