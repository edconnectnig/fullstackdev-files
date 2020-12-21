import React, {useState, useEffect} from "react";
import { Button, Jumbotron, Container, Row, Col, Card } from "react-bootstrap";
import Layout from "./shared/Layout";
import {Link } from 'react-router-dom'
import api from './api';
import util from './util';

const Home = (props) => {

  const [projects, setProjects] = useState([])
  useEffect( () => {
    const getProjects =  async () =>{
     const data =   await  api.getProjects();
     setProjects(data.slice(0, 4))
    }
    getProjects();
  }, [])
  return (
    <Layout>
      <>
        <Jumbotron>
          <div>
            <h1>Welcome to Project Explorer</h1>
          </div>
          <p>
            Project Explorer is a repository for final year projects across all
            departments at your institution. You can submit your projects and
            search other projects submitted by others to learn from.
          </p>
         { !util.activeSession() ? <div>
            <Button href="/signup" variant="primary" className="mr-4">
              Get Started
            </Button>
            <Button href="/login" variant="secondary">
              Login
            </Button>
          </div> : null }
        </Jumbotron>

        <Container>
          <Row className="showcase">
            {projects.map((project) => (
              <Col key={project.id} md={3} lg={3} > 
                <Card  className="p-3 project-card">
                  <h5>
                    <Link to={`/project/${project.id}`}>{project.name} </Link>
                  </h5>
                  <h6>{project.authors.join(', ')}</h6>
                  <p className="mt-3">{project.abstract}</p>
                  <div>
                    {project.tags.map((tag) => (
                      <a key={tag} href="#">
                        {tag}
                      </a>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    </Layout>
  );
};

export default Home;
