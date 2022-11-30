import {
  createPasswordApi,
  loginUserApi,
  registerUserApi,
  sendInvitationApi,
} from "../api/signInOutApi";
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

const setToken = (token) => {
  localStorage.setItem("token", token);
  localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};

const signUpUserRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    return registerUserApi(data)
      .then((response) => {
        dispatch({ type: SIGNUP_SUCCESS, json: response.data });
      })
      .catch((error) => {
        dispatch({ type: SIGNUP_FAIL, error: error.message });
      });
  };
};

const userSignInRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: SIGNIN_REQUEST });
    return loginUserApi(data)
      .then((response) => {
        dispatch({ type: SIGNIN_SUCCESS, json: response });
        setToken(response.headers.authorization);
        return response;
      })
      .catch((error) => {
        dispatch({ type: SIGNIN_FAIL, error: error.message });
      });
  };
};

const sendInvitationRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: SEND_IVITATION_REQUEST });
    return sendInvitationApi(data)
      .then((response) => {
        dispatch({ type: SEND_IVITATION_SUCCESS, json: response });
        return response;
      })
      .catch((error) => {
        dispatch({ type: SEND_IVITATION_FAIL, error: error.message });
      });
  };
};

const createPasswordDispatchRequest = (data) => {
  return (dispatch) => {
    dispatch({ type: CREATE_PASSWORD_REQUEST });
    return createPasswordApi(data)
      .then((response) => {
        dispatch({ type: CREATE_PASSWORD_SUCCESS, json: response });
        return response;
      })
      .catch((error) => {
        dispatch({ type: CREATE_PASSWORD_FAIL, error: error.message });
      });
  };
};

export const signUpUser = (data) => (dispatch) => {
  return dispatch(signUpUserRequest(data));
};

export const userSignIn = (data) => (dispatch) => {
  return dispatch(userSignInRequest(data));
};

export const sendInvitation = (data) => (dispatch) => {
  return dispatch(sendInvitationRequest(data));
};

export const createPasswordDispatch = (data) => (dispatch) => {
  return dispatch(createPasswordDispatchRequest(data));
};

export const signOutUser = (data) => (dispatch) => {
  return dispatch({ type: SIGNOUT_USER, value: data });
};
