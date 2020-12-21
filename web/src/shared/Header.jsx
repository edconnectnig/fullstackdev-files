import React, { useState, useEffect } from "react";
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import api from "../api";
import util from "../util";
export default () => {

  const [user, setuser] = useState();
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const uid = util.getCookie("uid");
      if (uid) {
        const user = await api.getUser(uid);
        setuser(user);
      }
    };
    init();
  }, []);

  return (
    <Navbar bg="primary" variant="dark" className="justify-content-between">
      <Nav>
        <Navbar.Brand href="/">Project Explorer App</Navbar.Brand>

        <Form inline>
          <FormControl type="text" placeholder="Search Projects" />
          <Button variant="outline-light" type="submit">
            Search
          </Button>
        </Form>
        <Nav>
          <Nav.Link href="/projects">Projects</Nav.Link>
          <Nav.Link href="/projects/submit">Submit</Nav.Link>
        </Nav>
      </Nav>

      {user ? (
        <Nav className="justift-content-end">
          <Nav.Link
            href="#"
            onClick={() => {
              util.delCookie("uid");
              setuser(undefined)
              history.push("/");
            }}
          >
            Logout
          </Nav.Link>
          <Nav.Link id="username">
            Hi {user.firstname}
          </Nav.Link>
        </Nav>
      ) : (
        <Nav className="justift-content-end">
          <Nav.Link href="/signup">Sign up</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
};
