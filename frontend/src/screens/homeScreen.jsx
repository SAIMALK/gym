import React from "react";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";
import dumbleImg from '../assets/dumble.jpg'; // adjust the path if necessary
import Facilities from "../components/facilities";
import Timings from "../components/timings";
import Packages from "../components/packages";
const HomeScreen = () => {
  return (

    <div>
      {/* Carousel Section */}
      <Container className="my-4">
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={dumbleImg}
        alt="First slide"
        style={{ height: "450px", objectFit: "cover", borderRadius: "10px" }}
      />
      <Carousel.Caption>
        <h3 style={{ color:"white" }}>Transform Your Body</h3>
        <p>Join our expert-led fitness programs today!</p>
      </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fGd5bXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Second slide"
        style={{ height: "450px", objectFit: "cover", borderRadius: "10px" }}
      />
      <Carousel.Caption>
        <h4 style={{ color:"white" }}
>State-of-the-Art Equipment</h4>
        <p>Train with top gear and cutting-edge machines.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</Container>


      {/* Packages Section */}
     <Packages/>
 {/* Facilities Section */}
    <Facilities/>
 {/* Timings Section */}
 <Timings/>
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
