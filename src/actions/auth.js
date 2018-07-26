import constants from "../constants/auth";

export const authenticate = result => dispatch => {
  dispatch({
    type: constants.AUTHENTICATE_REQUEST
  });

  return fetch("http://localhost:4000/v1/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      access_token: result.accessToken
    })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("auth_token", data.auth_token);

      dispatch({
        type: constants.AUTHENTICATE_SUCCESS,
        data
      });
    })
    .catch(response => {
      dispatch({
        type: constants.AUTHENTICATE_FAILURE,
        errorMessage: response.status
      });
    });
};
