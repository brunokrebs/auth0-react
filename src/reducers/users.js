import { Map } from "immutable";

import constants from "../constants/user";

const initialState = Map({
  users: Map(),
  user: Map(),
  ui: Map({
    users: Map({
      loading: false,
      doneLoading: false,
      loadError: null
    }),
    user: Map({
      loading: false,
      doneLoading: false,
      loadError: null
    })
  })
});

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_USERS_REQUEST:
      return state.set("users", Map()).updateIn(["ui", "users"], () => {
        return Map({
          loading: true,
          doneLoading: false,
          loadError: null
        });
      });

    case constants.FETCH_USERS_SUCCESS:
      return state
        .set("users", Map(action.users.data.map(u => [u.id, u])))
        .updateIn(["ui", "users"], () => {
          return Map({
            loading: false,
            doneLoading: true,
            loadError: null
          });
        });

    case constants.FETCH_USERS_FAILURE:
      return state.updateIn(["ui", "users"], () => {
        return Map({
          loading: false,
          doneLoading: false,
          loadError: action.errorMessage
        });
      });

    case constants.HAS_NEW_USER:
      return state
        .set(
          "users",
          state.get("users").merge(Map([[action.user.id, action.user]]))
        )
        .updateIn(["ui", "users"], () => {
          return Map({
            loading: false,
            doneLoading: true,
            loadError: null
          });
        });

    case constants.SAVE_USER_REQUEST:
      return state.set("user", Map()).updateIn(["ui", "user"], () => {
        return Map({
          loading: true,
          doneLoading: false,
          loadError: null
        });
      });

    case constants.SAVE_USER_SUCCESS:
      return state
        .set("user", Map([[action.user.id, action.user]]))
        .updateIn(["ui", "user"], () => {
          return Map({
            loading: false,
            doneLoading: true,
            loadError: null
          });
        });

    case constants.SAVE_USER_FAILURE:
      return state.updateIn(["ui", "user"], () => {
        return Map({
          loading: false,
          doneLoading: false,
          loadError: action.errorMessage
        });
      });

    default:
      return state;
  }
};
