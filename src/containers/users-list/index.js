import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUsers, deleteUser, channelConnection } from "../../actions/users";
import UsersList from "../../components/functional/users-list";

function mapStateToProps(state) {
  return {
    users: state.users.get("users"),
    usersUi: state.users.get("ui").get("users")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers,
      deleteUser,
      channelConnection
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
