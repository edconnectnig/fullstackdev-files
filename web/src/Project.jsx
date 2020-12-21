import React, { useState, useEffect } from "react";
import Layout from "./shared/Layout";
import {
  Button,
  Container,
  Card,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import api from "./api";

export default (props) => {
  const [project, setProject] = useState({
    comments: [],
    authors: [],
    tags: [],
  });

  const params = useParams();

  useEffect(() => {
    const getProject = async () => {
      const project = await api.getProject(params.id)
      const createdBy = await api.getUser(project.createdBy);
      project.createdBy = createdBy;
      setProject(project)
    }
   getProject();
  }, []);

  return (
    <Layout>
      <Row>
        <Col>
          <h3 className="mt-5" id="project_name">{project.name}</h3>
          <Container>
            <Row className="p-3 mt-3 mb-5 bg-light text-dark">
              <Col>
                Created By <br />{" "}
                <h6 id="project_author">{`${project.createdBy?.firstname} ${project.createdBy?.lastname}`}</h6>
              </Col>
              <Col>Date Created <br /> <h6>{ project.createdAt}</h6></Col>
              <Col>Last Updated <br /> <h6>{ project.updatedAt}</h6></Col>
              <Col className="d-flex justify-content-end">
                <div>
                  <Button href={`/projects/${project._id}/edit`}>
                    Edit Project
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Project Abstract</h5>
          <hr />
          <p  id="project_abstract" className="mb-5" style={{ fontSize: "1.1em" }}>
            {project.abstract}
          </p>
          <h5>Comments</h5>
          <hr />
          {project.comments && project.comments.length > 0 ? (
            <>
              {project.comments.map((comment, index) => (
                <Card key={index} className="mb-3">
                  <Card.Body>
                    <Card.Title>
                      {`${comment.createdBy.firstname} ${comment.createdBy.lastname}`}
                      {props.user && props.user._id === comment.createdBy._id && (
                        <button
                          type="button"
                          className="close"
                          onClick={() => ""}
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      )}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {comment.updatedAt}
                    </Card.Subtitle>
                    <Card.Text>{comment.message}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <p className="lead">No comments added yet</p>
            </div>
          )}
        </Col>
        <Col>
          <h5>Project Details</h5>
          <hr />
          <Card>
            <Card.Header>
              <h5>Author(s)</h5>
            </Card.Header>
            <ListGroup variant="flush" id="project_authors">
              {project.authors.map((author, index) => (
                <ListGroup.Item key={index}>
                  <span>{author}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Footer className="text-muted"  id="project_tags">
              {project.tags.map((tag, index) => (
                <span key={index} className="mr-2">
                  <a href={`/projects?search=${tag}&type=Tags`}>{`${tag}`}</a>
                </span>
              ))}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
