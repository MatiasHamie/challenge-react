import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "../reducers/authReducer";

import thunk from "redux-thunk";
import { uiReducer } from "../reducers/uiReducer";
import { userReducer } from '../reducers/userReducer';
import { meetupsReducer } from '../reducers/meetupsReducer';

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  users: userReducer,
  meetups: meetupsReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
