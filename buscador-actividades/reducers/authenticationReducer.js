import { userConstants } from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        logginIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCES:
      return {
        loggedIn: true,
        user: action.user
      };

    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};

    default:
      return state;
  }
}