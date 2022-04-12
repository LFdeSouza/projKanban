import { constants as C } from "../actions/constants";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: true,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case C.REGISTER_USER_SUCCESS:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case C.REGISTER_USER_FAIL:
      return { ...state, isAuthenticated: true, loading: false, user: null };
    case C.LOGIN_USER:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case C.LOGOUT_USER:
      return { ...state, isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

export default auth;
