import { userClient } from "../common/httpClients/userClient";

export const userApi = {
  async login(body: { email: string; password: string }) {
    try {
      return userClient.post("/signIn", body);
    } catch (e) {
      console.log("Unable to sign in");
    }
  }
};
