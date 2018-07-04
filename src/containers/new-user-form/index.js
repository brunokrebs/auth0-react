import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { saveUser } from "../../actions/users";
import NewUserForm from "../../components/functional/new-user-form";

function mapStateToProps(state) {
  return {
    user: state.users.get("user"),
    userUi: state.users.get("ui").get("user")
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      saveUser
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewUserForm);
