import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";

import { JoinNow } from "./joinNow";
import { store } from "../../store/store";

describe("JoinNow Component", () => {
  afterEach(cleanup);

  function renderComponent(customStore = store) {
    return render(
      <Provider store={customStore}>
        <JoinNow />
      </Provider>
    );
  }

  it("renders the component correctly", () => {
    renderComponent();

    expect(screen.getByText("SPORTS NEW CUSTOMER OFFER")).toBeInTheDocument();
    expect(screen.getByText("Get up to £10 in Free Bets")).toBeInTheDocument();
    expect(screen.getByRole("button").textContent).toEqual("Join Now");
  });

  it("does not render the component if user is logged in", () => {
    const customStore = {
      ...store,
      getState: () => ({ user: { loggedIn: true } })
    };
    renderComponent(customStore);

    expect(
      screen.queryByText("SPORTS NEW CUSTOMER OFFER")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Get up to £10 in Free Bets")
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("opens and closes the modal when button is pressed", () => {
    renderComponent();
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(
      screen.getByText("JOIN NOW TO GET FREE BETS!!!")
    ).toBeInTheDocument();

    const closeBtn = screen.getByText("X");

    fireEvent.click(closeBtn);

    expect(
      screen.queryByText("JOIN NOW TO GET FREE BETS!!!")
    ).not.toBeInTheDocument();
  });
});
