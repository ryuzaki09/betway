export interface IValidationLogin {
  valid: boolean;
  message: string;
}

export function emailIsValid(email: string): boolean {
  return !!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
}

export function validateLogin(
  email: string,
  password: string
): IValidationLogin {
  if (!emailIsValid(email)) {
    return { valid: false, message: "Email is not valid" };
  }

  if (password.length < 8) {
    return { valid: false, message: "Password requires a minimum length of 8" };
  }

  return { valid: true, message: "" };
}
