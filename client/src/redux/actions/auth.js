import { constants as C } from "./constants";
import axios from "axios";

export const registerUser = (name, email, password) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: C.REGISTER_USER_SUCCESS,
      payload: res.data.user,
    });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/users/login", body, config);
    dispatch({ type: C.LOGIN_USER, payload: res.data.user });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const logout = () => async (dispatch) => {
  dispatch(C.LOGOUT_USER);
};
