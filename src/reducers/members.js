import { Map } from "immutable";

import constants from "../constants/members";

const initialState = Map({
  members: Map(),
  channel: null,
  ui: Map({
    members: Map({
      loading: false,
      doneLoading: false,
      loadError: null
    })
  })
});

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_MEMBERS_REQUEST:
      return state.set("members", Map()).updateIn(["ui", "members"], () => {
        return Map({
          loading: true,
          doneLoading: false,
          loadError: null
        });
      });

    case constants.FETCH_MEMBERS_SUCCESS:
      return state
        .set("members", Map(action.members.data.map(u => [u.id, u])))
        .updateIn(["ui", "members"], () => {
          return Map({
            loading: false,
            doneLoading: true,
            loadError: null
          });
        });

    case constants.FETCH_MEMBERS_FAILURE:
      return state.updateIn(["ui", "members"], () => {
        return Map({
          loading: false,
          doneLoading: false,
          loadError: action.errorMessage
        });
      });

    case constants.HAS_NEW_MEMBER:
      return state
        .set(
          "members",
          state.get("members").merge(Map([[action.member.id, action.member]]))
        )
        .updateIn(["ui", "members"], () => {
          return Map({
            loading: false,
            doneLoading: true,
            loadError: null
          });
        });

    case constants.JOIN_MEMBER_CHANNEL_SUCCESS:
      return state.set("channel", action.channel);

    case constants.LEAVE_MEMBER_CHANNEL_SUCCESS:
      return state.set("channel", null);

    default:
      return state;
  }
};
