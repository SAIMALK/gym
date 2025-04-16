import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const MemberCard = ({ member }) => {
  return (
    <Card className="my-3 p-3 rounded shadow-sm">
      <Link to={`/member/${member._id}`}>
        {member.image ? (
          <Image src={member.image} rounded fluid />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
      </Link>
      <Card.Body>
        <Link to={`/member/${member._id}`}>
          <Card.Title as="div">
            <strong>{member.name}</strong>
          </Card.Title>
        </Link>

        <Row>
          <Col>Phone: <a href={`tel:${member.phone}`}>{member.phone}</a></Col>
        </Row>
        <Row>
          <Col>Membership: {member.membershipType}</Col>
        </Row>
        <Row>
          <Col>Age: {member.age}</Col>
        </Row>
        <Row>
          <Col>Gender: {member.gender}</Col>
        </Row>
        <Row>
          <Col>
            Joined: {new Date(member.joinDate).toLocaleDateString()}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default MemberCard;
