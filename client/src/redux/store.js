import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { boardReducer } from "./reducers/boardReducer";

const middleware = [thunk];

const store = createStore(
  combineReducers({ boardReducer }),
  {},
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
