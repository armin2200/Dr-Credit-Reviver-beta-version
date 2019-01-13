import { apiCall, setTokenHeader, api } from "../../services/api";
import { SET_CURRENT_USER, UPDATE_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./error";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
export function updateCurrentUser(user) {
  return {
    type: UPDATE_CURRENT_USER,
    user
  };
}
export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
}

export function updateProfile(userData) {
  return dispatch => {
    const { token, ...user } = userData;
    localStorage.setItem("jwtToken", token);
    setAuthorizationToken(token);
    dispatch(updateCurrentUser(user));
  };
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      const signedIn = userData.signedIn;
      return apiCall("post", `${api}/api/users/${type}`, userData)
        .then(({ token, ...user }) => {
          if (signedIn) localStorage.setItem("jwtToken", token);
          setAuthorizationToken(token);
          dispatch(setCurrentUser(user));
          dispatch(removeError());
          resolve();
        })
        .catch(err => {
          dispatch(addError(err.message));
          reject();
        });
    });
  };
}
