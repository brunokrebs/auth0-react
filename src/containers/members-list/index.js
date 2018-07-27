import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  fetchMembers,
  deleteMember,
  joinChannel,
  leaveChannel
} from "../../actions/members";
import MembersList from "../../components/functional/members-list";

function mapStateToProps(state) {
  return {
    members: state.members.get("members"),
    membersUi: state.members.get("ui").get("members"),
    channel: state.members.get("channel")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchMembers,
      deleteMember,
      joinChannel,
      leaveChannel
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList);
