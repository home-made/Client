import { Actions } from "react-native-router-flux";
import AuthService from "../Utils/AuthService";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const authService = new AuthService({
  clientId: "Rp7ThYPPRNHrSGUaLOv_Ub307zwDb_VR",
  domain: "stzy.auth0.com",
  useBrowser: true
});

export function checkLogin() {
  return dispatch => {
    authService.lock.on("authenticated", authResult => {
      authService.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) return dispatch(loginError(error));
        AuthService.setToken(authResult.idToken);
        AuthService.setProfile(profile);
        return dispatch(loginSuccess(profile));
      });
    });
    authService.lock.on("authorization_error", error =>
      dispatch(loginError(error))
    );
  };
}

export function loginRequest() {
  authService.login();
  return {
    type: LOGIN_REQUEST
  };
}

export function loginSuccess(profile) {
  Actions.newpage();
  return {
    type: LOGIN_SUCCESS,
    profile
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}

export function logoutSuccess() {
  authService.logout();
  Actions.homepage();
  return {
    type: LOGOUT_SUCCESS
  };
}
