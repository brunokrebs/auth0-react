import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { editUser, fetchUser } from "../../actions/users";
import EditUserForm from "../../components/functional/edit-user-form";

function mapStateToProps(state) {
  return {
    user: state.users.get("user"),
    userUi: state.users.get("ui").get("user")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      editUser,
      fetchUser
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserForm);
