import { store } from "../store";

export type UserActionTypes = "LOGGED_IN" | "LOGGED_OUT";

export type UserActions = {
  type: UserActionTypes
}

export function loginAction() {
  store.dispatch({ type: "LOGGED_IN" });
}

export function logoutAction() {
  store.dispatch({ type: "LOGGED_OUT" });
}
