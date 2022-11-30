import { combineReducers } from "redux";
import {
  signUpUserReducer,
  signInUserReducer,
  signOutUser,
  sendInvitationReducer,
  createPasswordReducer,
} from "./signInOutReducer";

export default combineReducers({
  signUpUserReducer,
  signInUserReducer,
  signOutUser,
  sendInvitationReducer,
  createPasswordReducer,
});
