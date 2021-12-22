import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";

import { Header } from "./header";
import { store } from "../../store/store";

describe("Header Component", () => {
  function renderComponent(customStore = store) {
    return render(
      <Provider store={customStore}>
        <Header />
      </Provider>
    );
  }

  it("renders the logo, login button and signup button when user is not logged in", () => {
    renderComponent();
    const logo = screen.getByRole("img");
    const buttons = screen.getAllByRole("button");

    expect(logo).toBeInTheDocument();
    expect(buttons[0].textContent).toEqual("Login");
    expect(buttons[1].textContent).toEqual("Sign Up");
  });

  it("renders the logo and logout button when user is logged in", () => {
    store.getState = jest.fn().mockReturnValue({ user: { loggedIn: true } });
    renderComponent(store);
    const logo = screen.getByRole("img");
    const logoutBtn = screen.getByRole("button");

    expect(logo).toBeInTheDocument();
    expect(logoutBtn.textContent).toEqual("Logout");
  });

  it("opens the login modal when login button is pressed and closes the modal", () => {
    store.getState = jest.fn().mockReturnValue({ user: { loggedIn: false } });
    renderComponent();

    const loginModalBtn = screen.getAllByRole("button")[0];

    fireEvent.click(loginModalBtn);

    const usernameField = screen.getByRole("textbox", { name: /username/i });
    const passwordField = screen.getByLabelText(/password/i);

    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    const closeBtn = screen.getByText("X");

    fireEvent.click(closeBtn);

    expect(usernameField).not.toBeInTheDocument();
    expect(passwordField).not.toBeInTheDocument();
  });

  it("opens the signup modal when signup button is pressed and closes the modal", () => {
    store.getState = jest.fn().mockReturnValue({ user: { loggedIn: false } });
    renderComponent();

    const signupModalBtn = screen.getAllByRole("button")[1];

    fireEvent.click(signupModalBtn);
    
    const emailField = screen.getByRole("textbox", { name: /email/i });

    expect(emailField).toBeInTheDocument();

    const closeBtn = screen.getByText("X");

    fireEvent.click(closeBtn);

    expect(emailField).not.toBeInTheDocument();
  });
});
