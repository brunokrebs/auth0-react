import auth0 from "auth0-js";

import { history } from "../store";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "ghoshnirmalya.auth0.com",
    clientID: "WzAIG1qj90BMgw0mX6ERdS4asSYee97D",
    redirectUri: "http://localhost:3000/callback",
    audience: "https://ghoshnirmalya.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid"
  });

  login = () => {
    this.auth0.authorize();
  };

  handleAuthentication = authenticate => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, authenticate);
      } else if (err) {
        console.log(err);
      }
    });
  };

  setSession = (authResult, authenticate) => {
    authenticate(authResult).then(() => {
      history.replace("/");
    });
  };

  logout = () => {
    // Clear Auth Token from local storage
    localStorage.removeItem("auth_token");
    // navigate to the auth route
    history.replace("/auth");
  };

  isAuthenticated = () => !!localStorage.getItem("auth_token");
}
