import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { authenticate } from "../../actions/auth";
import App from "../../components/functional/app";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticate }, dispatch);

// https://github.com/ReactTraining/react-router/issues/3536#issuecomment-225586661
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(App);
