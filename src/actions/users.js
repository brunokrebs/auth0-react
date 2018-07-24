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
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
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

export const fetchUser = id => dispatch => {
  dispatch({
    type: constants.FETCH_USER_REQUEST
  });

  return fetch(`http://localhost:4000/v1/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    }
  })
    .then(res => res.json())
    .then(user => {
      dispatch({
        type: constants.FETCH_USER_SUCCESS,
        user
      });
    })
    .catch(response => {
      dispatch({
        type: constants.FETCH_USER_FAILURE,
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

export const saveUser = values => dispatch => {
  dispatch({
    type: constants.SAVE_USER_REQUEST
  });

  return fetch("http://localhost:4000/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    },
    body: JSON.stringify({ user: values })
  })
    .then(res => res.json())
    .then(user => {
      dispatch({
        type: constants.SAVE_USER_SUCCESS,
        user: user.data
      });
    })
    .catch(response => {
      dispatch({
        type: constants.SAVE_USER_FAILURE,
        errorMessage: response.status
      });
    });
};

export const editUser = values => dispatch => {
  dispatch({
    type: constants.SAVE_USER_REQUEST
  });

  return fetch(`http://localhost:4000/v1/users/${values.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    },
    body: JSON.stringify({ user: values })
  })
    .then(res => res.json())
    .then(user => {
      dispatch({
        type: constants.SAVE_USER_SUCCESS,
        user: user.data
      });
    })
    .catch(response => {
      dispatch({
        type: constants.SAVE_USER_FAILURE,
        errorMessage: response.status
      });
    });
};

export const deleteUser = id => dispatch => {
  dispatch({
    type: constants.DELETE_USER_REQUEST
  });

  return fetch(`http://localhost:4000/v1/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("id_token")}`
    }
  })
    .then(() => {
      dispatch({
        type: constants.DELETE_USER_SUCCESS,
        id
      });
    })
    .catch(response => {
      dispatch({
        type: constants.DELETE_USER_FAILURE,
        errorMessage: response.status
      });
    });
};
