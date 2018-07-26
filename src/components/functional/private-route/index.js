import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth, currentPath, ...rest }) => {
  const authenticated = auth.isAuthenticated();

  if (authenticated && currentPath === "/auth") {
    return <Redirect to="/members" />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} auth={auth} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default PrivateRoute;
