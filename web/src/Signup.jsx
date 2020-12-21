import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import Layout from "./shared/Layout";

import api from "./api";
import util from './util'

export default () => {
  const [programs, setPrograms] = useState([]);
  const [graduationYears, setGraduationYears] = useState([]);
  const [user, setUser] = useState({});
  const history = useHistory()
  const [error, setError] = useState();

  useEffect(() => {
    const getPograms = async () => {
      const progs = await api.getPrograms();
      setPrograms(progs);
    };
    const getGradYears = async () => {
      const years = await api.getGradYear();
      setGraduationYears(years);
    };
    getPograms();
    getGradYears();
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const {data} = await  api.register(user)
      util.setCookie("uid", data.id)
      history.push('/');

    } catch (er) {
        setError(er.errors);
    }
  };
  const handleInputChange = (evt) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <Layout>
      <Row className="justify-content-center my-5 w-75 mx-auto">
        <Col>
          <h3>Sign up</h3>
          {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={user.firstname || ""}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  onChange={handleInputChange}
                  value={user.lastname || ""}
                  placeholder="Last name"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  value={user.email || ""}
                  placeholder="Your Email address"
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleInputChange}
                  placeholder="Your Password"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label>Program</Form.Label>
                <Form.Control
                  as="select"
                  name="program"
                  onChange={handleInputChange}
                  value={user.program || ""}
                  defaultValue="Choose..."
                  required
                >
                  <option value="">Choose...</option>
                  {programs.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Matriculation number</Form.Label>
                <Form.Control
                  type="text"
                  value={user.matricNumber || ""}
                  onChange={handleInputChange}
                  name="matricNumber"
                  placeholder="e.g. 16/2020"
                  required
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Graduation year</Form.Label>
                <Form.Control
                  as="select"
                  value={user.graduationYear || ""}
                  onChange={handleInputChange}
                  name="graduationYear"
                  defaultValue="Choose..."
                  required
                >
                  <option value="">Choose...</option>
                  {graduationYears.map((value, index) => (
                    <option key={index} value={value}>
                      {value}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};
