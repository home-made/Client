import Auth0Lock from "react-native-lock";
import jwtDecode from "jwt-decode";
import { AsyncStorage } from "react-native";

export default class AuthService {
  constructor(clientId, domain) {
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: "http://localhost:3000/callback",
        responseType: "token"
      },
      languageDictionary: {
        title: "Homemade"
      }
    });
    this.login = this.login.bind(this);
  }


  // ======================================================
  login() {
    this.lock.show();
  }

  logout() {
    AsyncStorage.removeItem("id_token");
    AsyncStorage.removeItem("profile");
  }


  // ======================================================
  static getProfile() {
    const profile = AsyncStorage.getItem("profile");
    return profile ? JSON.parse(AsyncStorage.profile) : {};
  }

  static loggedIn() {
    const token = AuthService.getToken();
    return !!token && !AuthService.isTokenExpired(token);
  }

  static setProfile(profile) {
    AsyncStorage.setItem("profile", JSON.stringify(profile));
  }

  static getProfile(){
    const profile = AsyncStorage.getItem('profile')
    return profile ? JSON.parse(AsyncStorage.profile) : {}
  }

  static setToken(idToken) {
    AsyncStorage.setItem("id_token", idToken);
  }

  static getToken() {
    return AsyncStorage.getItem("id_token");
  }

  static getTokenExpirationDate() {
    const token = AuthService.getToken();
    const decoded = jwtDecode(token);
    if (!decoded.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  static isTokenExpired() {
    const token = AuthService.getToken();
    if (!token) return true;
    const date = AuthService.getTokenExpirationDate(token);
    const offsetSeconds = 0;
    if (date === null) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
  }
}
