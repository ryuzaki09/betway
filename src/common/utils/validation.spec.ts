import { validateLogin } from "./validation";

describe("validateLogin utility", () => {
  it("returns an error when email is in valid", () => {
    const invalidEmail = "invalidEmail";
    const { valid, message } = validateLogin(invalidEmail, "");

    expect(valid).toEqual(false);
    expect(message).toEqual("Email is not valid");
  });

  it("returns an error when password is less than 8 chars", () => {
    const email = "test@test123.com";
    const password = "1234567";
    const { valid, message } = validateLogin(email, password);

    expect(valid).toEqual(false);
    expect(message).toEqual("Password requires a minimum length of 8");
  });

  it("returns valid when email and password is valid", () => {
    const email = "test@test123.com";
    const password = "12345678";
    const { valid, message } = validateLogin(email, password);

    expect(valid).toEqual(true);
    expect(message).toEqual("");
  });
});
