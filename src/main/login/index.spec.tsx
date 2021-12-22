import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { Login } from "./index";
import { userApi } from "../../api/userApi";
import { store } from "../../store/store";

describe("Login Component", () => {
  it("renders the component successfully", () => {
    render(<Login />);

    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);

    expect(screen.getByText("New Customer? Register here")).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toEqual("Login");
  });

  it("displays an error when login is pressed without entering the fields", () => {
    render(<Login />);

    const loginBtn = screen.getByRole("button");

    fireEvent.click(loginBtn);

    const error = screen.getByText("All fields are required");

    expect(error).toBeInTheDocument();
  });

  it("displays email is invalid when entering an invalid email address", () => {
    render(<Login />);

    const usernameField = screen.getByRole("textbox", { name: /username/i });

    fireEvent.change(usernameField, { target: { value: "hello" } });

    const error = screen.getByText("Email is not valid");

    expect(error).toBeInTheDocument();
  });

  it("displays password is invalid when entering password that does not meet minimum length", () => {
    render(<Login />);

    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);

    fireEvent.change(usernameField, { target: { value: "jest@test.com" } });
    fireEvent.change(passwordField, { target: { value: "hello" } });

    const error = screen.getByText("Password requires a minimum length of 8");

    expect(error).toBeInTheDocument();
  });

  it("calls the login api AND dispatch loginAction after entering credentials and pressing login", async () => {
    const apiSpy = jest.spyOn(userApi, "login").mockResolvedValue(true as any);
    const customStore = store;
    customStore.dispatch = jest.fn();

    render(
      <Provider store={customStore}>
        <Login />
      </Provider>
    );

    const username = "jest@test.com";
    const password = "password";
    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);
    const loginBtn = screen.getByRole("button");

    fireEvent.change(usernameField, { target: { value: username } });
    fireEvent.change(passwordField, { target: { value: password } });
    fireEvent.click(loginBtn);

    expect(apiSpy).toHaveBeenCalledWith({ email: username, password });

    await waitFor(() => {
      expect(customStore.dispatch).toHaveBeenCalled();
    });
  });
});
