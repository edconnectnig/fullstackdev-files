import Layout from "./shared/Layout";
import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";

import api from "./api";
import util from "./util";
import { useHistory } from "react-router-dom";

export default () => {
  const [project, setproject] = useState({});
  const history = useHistory();

  const [error, seterror] = useState();

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      await api.createProject(project);
      history.push("/");
    } catch (er) {
      seterror(er.errors);
    }
  };

  const handleInputChange = (evt) => {
    const name = evt.currentTarget.name;
    const value = evt.currentTarget.value;
    if (name === "authors") {
      project.authors = project.authors || [];
      project.authors = value.split(",").map((v) => v.trim());
    } else if (name === "tags") {
      project.tags = project.tags || [];
      project.tags = value.split(" ");
    } else {
      project[name] = value;
    }
    setproject({ ...project });
  };
  if (!util.activeSession()) {
    history.push("/login");
  }
  return (
    <Layout>
      {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}
      <Row>
        <Col>
          <h3 className="mb-4">Submit Project</h3>
          <Form id="createProjectForm" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Project name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter project name"
                onChange={handleInputChange}
                defaultValue={project ? project.name : ""}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Project abstract</Form.Label>
              <Form.Control
                as="textarea"
                onChange={handleInputChange}
                name="abstract"
                rows="7"
                defaultValue={project ? project.abstract : ""}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author(s)</Form.Label>
              <Form.Control
                type="text"
                name="authors"
                onChange={handleInputChange}
                placeholder="Enter author names (seperated by comma)"
                defaultValue={
                  project && project.authors ? project.authors.join(",") : ""
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tag(s)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                onChange={handleInputChange}
                placeholder="Use # to tag project with different topics (e.g. #javascript #mongodb)"
                defaultValue={
                  project && project.tags ? project.tags.join(" ") : ""
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {project ? "Save" : "Continue"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};
