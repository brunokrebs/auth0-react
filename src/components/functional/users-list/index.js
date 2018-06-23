import React from "react";
import PropTypes from "prop-types";
import { List, Card } from "antd";
import styled from "styled-components";

const ListItemWrapper = styled(List.Item)`
  margin: 20px;
`;

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.channelConnection();
  }

  errorNode = () => {
    return this.props.usersUi.get("loadError");
  };

  listNode = () => (
    <List
      loading={this.props.usersUi.get("loading")}
      grid={{ column: 4 }}
      dataSource={this.props.users.toArray()}
      renderItem={item => (
        <ListItemWrapper>
          <Card title={item.name}>{item.name}</Card>
        </ListItemWrapper>
      )}
    />
  );

  render() {
    return this.props.usersUi.get("loadError")
      ? this.errorNode()
      : this.listNode();
  }
}

UsersList.propTypes = {
  fetchUsers: PropTypes.func,
  users: PropTypes.object,
  usersUi: PropTypes.object
};

export default UsersList;
