import React from "react";
import { act, render } from "@testing-library/react";
import Home from "./Home";
import api from "./api";
import faker from "faker";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("./api");

describe("Home Component", () => {
  const fakeProjects = new Array(10).fill(0).map((p) => {
    return {
      id: faker.random.alphaNumeric(6),
      name: faker.lorem.words(),
      abstract: faker.lorem.sentence(),
      authors: [faker.name.firstName(), faker.name.firstName()],
      tags: [faker.lorem.word(), faker.lorem.word()],
    };
  });

  test("renders top 4 projects", async () => {

    api.getProjects.mockResolvedValue(fakeProjects);

    await act(async () => {
      render(
        <Router>
          <Home />
      </Router>
      );
    });

    const items = document.getElementsByClassName("project-card");
    expect(items.length).toBe(4);
    expect(items[0].textContent).toContain(fakeProjects[0].name);
    expect(items[1].textContent).toContain(fakeProjects[1].name);
    expect(items[2].textContent).toContain(fakeProjects[2].name);
    expect(items[3].textContent).toContain(fakeProjects[3].name);
  });
});
