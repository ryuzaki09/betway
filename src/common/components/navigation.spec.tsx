import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";

import { Navigation } from "./navigation";
import { appRoutes } from "../constants";

describe("Navigation Component", () => {
  it("renders the navigation list", () => {
    render(
      <MemoryRouter initialEntries={["/abc"]}>
        <Navigation />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    expect(links.length).toEqual(appRoutes.length);

    links.forEach((l, index) => {
      expect(l.textContent).toEqual(appRoutes[index].name);
    });
  });
});
