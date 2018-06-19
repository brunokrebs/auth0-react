import constants from "../constants/user";

export const fetchUsers = () => dispatch => {
  dispatch({
    type: constants.FETCH_USERS_REQUEST
  });

  return fetch("http://localhost:4000/api/users")
    .then(res => res.json())
    .then(users => {
      dispatch({
        type: constants.FETCH_USERS_SUCCESS,
        users
      });
    })
    .catch(response => {
      dispatch({
        type: constants.FETCH_USERS_FAILURE,
        errorMessage: response.status
      });
    });
};
