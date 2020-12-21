import React, {useState} from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert
} from "react-bootstrap";
import Layout from "./shared/Layout";
import api from './api';
import util from './util'
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const history = useHistory()

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
     const {data } =  await api.login({
        email,
        password
      })
      util.setCookie("uid", data.id)
      history.push('/');
    } catch (er) {
      seterror("Invalid email/password")
    }
  }
  
  return (
       <Layout>
        <Container className="border rounded p-5">
       
          <Row>
            <Col>
              <h3 className="mb-4">Login</h3>
              {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}
              <Form id="loginForm" onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    required
                    onChange={evt => setemail(evt.currentTarget.value)}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    onChange={evt => setpassword(evt.currentTarget.value)}
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button varian="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
       </Layout>
  );
};

export default Login;
