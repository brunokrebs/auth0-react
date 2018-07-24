import auth0 from "auth0-js";

import { history } from "../store";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "ghoshnirmalya.auth0.com",
    clientID: "WzAIG1qj90BMgw0mX6ERdS4asSYee97D",
    // redirectUri: "http://localhost:3000/callback",
    redirectUri: "http://localhost:4000/v1/auth/auth0/callback",
    audience: "https://ghoshnirmalya.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/users");
      } else if (err) {
        history.replace("/users");
        console.log(err);
      }
    });
  };

  setSession = authResult => {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    history.replace("/users");
  };

  logout = () => {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // navigate to the home route
    history.replace("/users");
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  };
}
