import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchUsers, joinChannel, leaveChannel } from "../../actions/users";
import UsersList from "../../components/functional/users-list";

function mapStateToProps(state) {
  return {
    users: state.users.get("users"),
    usersUi: state.users.get("ui").get("users"),
    channel: state.users.get("channel")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUsers,
      joinChannel,
      leaveChannel
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersList);
