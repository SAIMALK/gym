import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Timings = () => {
  return (
    <Container className="timings my-5">
      <h2 className="text-center mb-4">Gym Timings</h2>
      <Row className="g-4 justify-content-center">
        <Col md={5}>
          <div className="timing-card">
            <h4>Men</h4>
            <p>Morning: 6:00 AM – 10:00 AM</p>
            <p>Evening: 5:00 PM – 9:00 PM</p>
          </div>
        </Col>
        <Col md={5}>
          <div className="timing-card">
            <h4>Women</h4>
            <p>Morning: 10:00 AM – 1:00 PM</p>
            <p>Evening: 3:00 PM – 5:00 PM</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Timings;
