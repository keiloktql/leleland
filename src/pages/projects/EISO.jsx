import React from 'react'
import BlogLayout from '../../layout/BlogLayout';
import { projectList } from '../../data/projects';
import { Container, Row, Col } from 'react-bootstrap';

const EISO = () => {

  const projectID = projectList[2].id;
  const project = projectList[2];

  return (
    <BlogLayout
      title="eISO • LeLeLand"
      projectID={projectID}
      project={project}
    >
      <Container fluid={true} className="c-EISO">

      </Container>
    </BlogLayout>
  );
};

export default EISO;