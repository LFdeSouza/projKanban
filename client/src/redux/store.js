import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import board from "./reducers/board";
import modal from "./reducers/modal";

const middleware = [thunk];

const store = createStore(
  combineReducers({ board, modal }),
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
