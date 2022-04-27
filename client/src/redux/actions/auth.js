import { constants as C } from "./constants";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users");
    dispatch({ type: C.LOGIN_USER, payload: res.data.user });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

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
  try {
    await axios.post("/api/users/logout");
    dispatch({ type: C.LOGOUT_USER });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const createBoard = (title) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ title });

  try {
    const res = await axios.post("/api/boards", body, config);

    dispatch({ type: C.CREATE_BOARD, payload: res.data.board });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const loadBoards = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/boards");
    dispatch({ type: C.LOAD_BOARDS, payload: res.data.boards });
  } catch (err) {
    console.log(err.response.data.errors);
  }
};
