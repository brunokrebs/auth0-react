import { Socket } from "phoenix";

import constants from "../constants/user";

const socket = new Socket("ws://localhost:4000/socket");

socket.connect();

export const fetchUsers = () => dispatch => {
  dispatch({
    type: constants.FETCH_USERS_REQUEST
  });

  return fetch("http://localhost:4000/v1/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`
    }
  })
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

export const joinChannel = () => dispatch => {
  const channel = socket.channel("users");

  channel.join().receive("ok", response => {
    dispatch({
      type: constants.JOIN_USER_CHANNEL_SUCCESS,
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

export const leaveChannel = channel => dispatch => {
  channel.leave().receive("ok", response => {
    dispatch({
      type: constants.LEAVE_USER_CHANNEL_SUCCESS,
      response,
      channel
    });
  });
};
