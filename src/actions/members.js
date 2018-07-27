import { Socket } from "phoenix";

import constants from "../constants/members";

const socket = new Socket("ws://localhost:4000/socket");

socket.connect();

export const fetchMembers = () => dispatch => {
  dispatch({
    type: constants.FETCH_MEMBERS_REQUEST
  });

  return fetch("http://localhost:4000/v1/members", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`
    }
  })
    .then(res => res.json())
    .then(members => {
      dispatch({
        type: constants.FETCH_MEMBERS_SUCCESS,
        members
      });
    })
    .catch(response => {
      dispatch({
        type: constants.FETCH_MEMBERS_FAILURE,
        errorMessage: response.status
      });
    });
};

export const editMember = (values, id) => dispatch => {
  dispatch({
    type: constants.EDIT_MEMBER_REQUEST
  });

  return fetch(`http://localhost:4000/v1/members/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify({
      member: {
        name: values.name
      }
    })
  })
    .then(res => res.json())
    .then(member => {
      dispatch({
        type: constants.EDIT_MEMBER_SUCCESS,
        member
      });
    })
    .catch(response => {
      dispatch({
        type: constants.EDIT_MEMBER_FAILURE,
        errorMessage: response.status
      });
    });
};

export const joinChannel = () => dispatch => {
  const channel = socket.channel("members");

  channel.join().receive("ok", response => {
    dispatch({
      type: constants.JOIN_MEMBER_CHANNEL_SUCCESS,
      response,
      channel
    });
  });

  channel.on("members::new", response => {
    dispatch({
      type: constants.HAS_NEW_MEMBER,
      member: response.member,
      channel
    });
  });

  channel.on("member::update", response => {
    dispatch({
      type: constants.HAS_UPDATED_MEMBER,
      member: response.member,
      channel
    });
  });
};

export const leaveChannel = channel => dispatch => {
  channel.leave().receive("ok", response => {
    dispatch({
      type: constants.LEAVE_MEMBER_CHANNEL_SUCCESS,
      response,
      channel
    });
  });
};
