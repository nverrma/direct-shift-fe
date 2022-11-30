import axios from "axios";

const REACT_APP_BASE_URL = "http://localhost:5000";
const REACT_APP_DOMAIM_URL = "http://localhost:3000";

export const registerUserApi = (data) => {
  return axios.post(`${REACT_APP_BASE_URL}/users`, data);
};

export const loginUserApi = (data) => {
  return axios.post(`${REACT_APP_BASE_URL}/users/sign_in`, data);
};

export const sendInvitationApi = (data) => {
  const token = localStorage.getItem("token");
  const routeForCreatePassword = `${REACT_APP_DOMAIM_URL}/create_password`;
  data["create_password_route"] = routeForCreatePassword;
  const config = {
    headers: { Authorization: token },
  };
  return axios.post(`${REACT_APP_BASE_URL}/users/invitation`, data, config);
};

export const createPasswordApi = (data) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("invitation_token");
  data["user"]["invitation_token"] = token;
  return axios.patch(`${REACT_APP_BASE_URL}/users/invitation`, data);
};
