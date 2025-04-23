import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Packages = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Our Packages</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Basic Plan</Card.Title>
              <ul>
                <li>Access to gym equipment</li>
                <li>Open workout area</li>
                <li>Yoga mats access</li>
              </ul>
              <Button variant="primary">Join Now</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pro Plan</Card.Title>
              <ul>
                <li>All Basic Plan benefits</li>
                <li>Personal trainer sessions</li>
                <li>Cardio machines access</li>
              </ul>
              <Button variant="primary">Join Now</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Elite Plan</Card.Title>
              <ul>
                <li>All Pro Plan benefits</li>
                <li>Yoga and Zumba sessions</li>
                <li>Personal lockers</li>
              </ul>
              <Button variant="primary">Join Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Packages;
