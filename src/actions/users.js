import { Socket } from "phoenix";

import constants from "../constants/user";

const socket = new Socket("ws://localhost:4000/socket", {
  logger: (kind, msg, data) => {
    console.log(`${kind}: ${msg}`, data);
  }
});

socket.connect();

const channel = socket.channel("users");

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

export const channelConnection = () => dispatch => {
  channel.join().receive("ok", response => {
    dispatch({
      type: constants.CONNECTED_TO_USER_CHANNEL,
      response,
      channel
    });
  });

  channel.on("users::new", response => {
    dispatch({
      type: constants.HAS_NEW_USER,
      user: response.user,
      channel
    });
  });
};
