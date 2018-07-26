import React from "react";
import PropTypes from "prop-types";

import PublicLayout from "../layout/public";
import Layout from "../layout";
import Auth from "../../../helpers/auth";

const auth = new Auth();

class App extends React.Component {
  render() {
    if (!auth.isAuthenticated())
      return <PublicLayout {...this.props} auth={auth} />;

    return <Layout {...this.props} auth={auth} />;
  }
}

App.propTypes = {
  history: PropTypes.object
};

export default App;
