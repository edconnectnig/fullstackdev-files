import React from "react";
import ReactTestUtils from 'react-dom/test-utils';
import { act, render } from "@testing-library/react";
import Login from "./Login";
import api from "./api";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("./api");

describe("Login Component", () => {
  test("show error for invalid login", async () => {

    api.login.mockImplementation(() => {
      throw new Error("login error");
    });

    // initial render
    act(() => {
      render(
        <Router>
          <Login />
        </Router>
      );
    });

    // enter email
    act(() => {
      const emailInput = document.querySelector("input[name='email']");
      emailInput.value = "foo@bar.com";
      ReactTestUtils.Simulate.change(emailInput)
    });

    // enter password
    act(() => {
      const passwordInput = document.querySelector("input[name='password']");
      passwordInput.value = "secret";
      ReactTestUtils.Simulate.change(passwordInput)
    });
    
    // submit
    await act(async () => {
      const form = document.getElementById("loginForm");
      ReactTestUtils.Simulate.submit(form)
     });
    
     // assertions
    expect(api.login).toBeCalledWith({
      email: "foo@bar.com",
      password: "secret",
    });
   const error =  document.querySelector('.alert');
   expect(error.textContent).toContain('Invalid email/password')
  });
});
