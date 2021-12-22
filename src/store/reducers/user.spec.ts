import { user as userReducer, initialState } from "./user";

describe("userReducer", () => {
  it("returns the initialState", () => {
    const state = userReducer(undefined, { type: "TEST_ACTION" } as any);

    expect(state).toEqual(initialState);
  });

  it("returns the user is loggedIn state when loginAction is dispatched", () => {
    const state = userReducer({ loggedIn: false }, { type: "LOGGED_IN" });

    expect(state.loggedIn).toEqual(true);
  });

  it("returns the user is not loggedIn state when logoutAction is dispatched", () => {
    const state = userReducer({ loggedIn: true }, { type: "LOGGED_OUT" });

    expect(state.loggedIn).toEqual(false);
  });
});
