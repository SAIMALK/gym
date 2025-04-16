import React from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";

const HomeScreen = () => {
  return (

    <div>
      {/* Carousel Section */}
      <Container className="my-4">
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGd5bXxlbnwwfHwwfHx8Mg%3D%3D"
        alt="First slide"
        style={{ height: "400px", objectFit: "cover", borderRadius: "10px" }}
      />
      <Carousel.Caption>
        <h3>Transform Your Body</h3>
        <p>Join our expert-led fitness programs today!</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Second slide"
        style={{ height: "400px", objectFit: "cover", borderRadius: "10px" }}
      />
      <Carousel.Caption>
        <h3>State-of-the-Art Equipment</h3>
        <p>Train with top gear and cutting-edge machines.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</Container>


      {/* Packages Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Packages</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Basic Plan</Card.Title>
                <Card.Text>
                  Access to gym equipment, open workout area, and locker room.
                </Card.Text>
                <Button variant="primary">Join Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Pro Plan</Card.Title>
                <Card.Text>
                  Includes Basic + personal trainer sessions and diet plans.
                </Card.Text>
                <Button variant="primary">Join Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Elite Plan</Card.Title>
                <Card.Text>
                  All features plus yoga, Zumba, steam room and spa access.
                </Card.Text>
                <Button variant="primary">Join Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* About Us Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">About Us</h2>
        <p className="text-center">
          At Body Fuel Gym, we believe fitness is a lifestyle. Our team of certified
          trainers and fitness experts provide personalized guidance and motivation to help
          you reach your goals. With top-notch facilities and a friendly community, you'll
          love every workout!
        </p>
      </Container>

      {/* Contact Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center">
          📍 Address: 123 Fitness Lane, Muscle City, Pakistan
          <br />
          📞 Phone: (123) 456-7890
          <br />
          📧 Email: contact@bodyfuelgym.com
        </p>
      </Container>
    </div>
  );
};

export default HomeScreen;
