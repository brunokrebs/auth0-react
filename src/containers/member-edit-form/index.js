import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { editMember } from "../../actions/members";
import MemberEditForm from "../../components/functional/member-edit-form";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editMember
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEditForm);
