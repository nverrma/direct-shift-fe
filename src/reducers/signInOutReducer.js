import { ERROR, INIT, LOADING, SUCCESS } from "../constants/fetchingTypes";
import {
  SIGNUP_FAIL,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNIN_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT_USER,
  SEND_IVITATION_REQUEST,
  SEND_IVITATION_SUCCESS,
  SEND_IVITATION_FAIL,
  CREATE_PASSWORD_REQUEST,
  CREATE_PASSWORD_SUCCESS,
  CREATE_PASSWORD_FAIL,
} from "../constants/actionTypes";

const initialState = {
  isFetching: INIT,
  authChecked: false,
  SignUpUser: {},
  currentUser: {},
  invitation: {},
  createPassword: {},
};

export const signUpUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isFetching: LOADING,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isFetching: SUCCESS,
        SignUpUser: action.json,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        isFetching: ERROR,
      };
    default:
      return state;
  }
};

export const signInUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        isFetching: LOADING,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isFetching: SUCCESS,
        authChecked: true,
        currentUser: action.json,
      };

    case SIGNIN_FAIL:
      return {
        ...state,
        isFetching: ERROR,
        authChecked: false,
        currentUser: {},
      };
    default:
      return state;
  }
};

export const sendInvitationReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SEND_IVITATION_REQUEST:
      return {
        ...state,
        isFetching: LOADING,
      };
    case SEND_IVITATION_SUCCESS:
      return {
        ...state,
        isFetching: SUCCESS,
        invitation: action.json,
      };

    case SEND_IVITATION_FAIL:
      return {
        ...state,
        isFetching: ERROR,
        authChecked: false,
        invitation: {},
      };
    default:
      return state;
  }
};

export const createPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CREATE_PASSWORD_REQUEST:
      return {
        ...state,
        isFetching: LOADING,
      };
    case CREATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isFetching: SUCCESS,
        createPassword: action.json,
      };

    case CREATE_PASSWORD_FAIL:
      return {
        ...state,
        isFetching: ERROR,
        authChecked: false,
        invitation: {},
      };
    default:
      return state;
  }
};

export const signOutUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNOUT_USER:
      return {
        ...state,
        isFetching: SUCCESS,
        authChecked: false,
        currentUser: action.value,
      };
    default:
      return state;
  }
};
