import React from "react";
import PropTypes from "prop-types";
import { List, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItemWrapper = styled(List.Item)`
  margin: 0 0 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
`;

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
    this.props.joinChannel(); // join the user channel
  }

  componentWillUnmount() {
    this.props.leaveChannel(this.props.channel); // leave the user channel
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
            <Link to={`/users/${item.id}/edit`}>
              <Button type="primary">Edit</Button>
            </Link>,
            <Button
              type="danger"
              onClick={() => this.props.deleteUser(item.id)}
            >
              Delete
            </Button>
          ]}
        >
          <List.Item.Meta title={item.username} />
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
