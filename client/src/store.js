import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userRegisterReducer,
  userLoginReducer,
  profileUpdateReducer,
  userListReducer,
  makeUserProfessionalReducer,
} from "./reducers/userReducers";
import { incommingServiceRequestReducer,userRequestedServiceReducer,userRequestedServiceListReducer } from "./reducers/serviceRequestReducer";

// save userInfo to the store
const userInfoFromStorege = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  // the user info like the token is only received when the user does login
  userLogin: { userInfo: userInfoFromStorege },
};

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  profileUpdate: profileUpdateReducer,
  userList: userListReducer,
  makeUserProfessional: makeUserProfessionalReducer,
  incommingServiceRequest:incommingServiceRequestReducer,
  userRequestedService:userRequestedServiceReducer,
  userRequestedServiceList:userRequestedServiceListReducer,
});

const middlewares = [thunk, logger];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
