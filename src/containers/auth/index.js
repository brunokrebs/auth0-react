import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Auth from "../../components/functional/auth";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
