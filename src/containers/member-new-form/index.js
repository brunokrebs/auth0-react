import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createMember } from "../../actions/members";
import MemberNewForm from "../../components/functional/member-new-form";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      createMember
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberNewForm);
