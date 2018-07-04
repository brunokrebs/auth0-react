import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";
import styled from "styled-components";

const ListItemWrapper = styled(List.Item)`
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
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
      dataSource={this.props.users.toArray()}
      renderItem={item => (
        <ListItemWrapper
          actions={[
            <Button type="primary" onClick={() => this.props.editUser(item.id)}>
              Edit
            </Button>,
            <Button
              type="danger"
              onClick={() => this.props.deleteUser(item.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta title={item.name} description={item.name} />
          <div>{item.name}</div>
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
