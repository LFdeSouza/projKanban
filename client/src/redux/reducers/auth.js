import { constants as C } from "../actions/constants";
import { produce } from "immer";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.REGISTER_USER_SUCCESS:
    case C.LOGIN_USER:
      return produce(state, (draft) => {
        draft.isAuthenticated = true;
        draft.isLoading = false;
        draft.user = payload;
        draft.user.boards = [];
      });
    case C.REGISTER_USER_FAIL:
    case C.LOGOUT_USER:
      return produce(state, (draft) => {
        draft.isAuthenticated = false;
        draft.isLoading = false;
        draft.user = null;
      });
    case C.LOAD_BOARDS:
      return produce(state, (draft) => {
        if (payload) {
          draft.user.boards = payload;
        }
      });
    case C.CREATE_BOARD:
      return produce(state, (draft) => {
        draft.user.boards.push(payload);
      });
    default:
      return state;
  }
};

export default auth;
