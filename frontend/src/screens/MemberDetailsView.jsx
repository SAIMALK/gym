import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Container,
} from "react-bootstrap";
import { BASE_URL } from "../constants";
const MemberDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate instead of history

  const [member, setMember] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/members/${id}`);
        if (!response.ok) throw new Error("Failed to fetch member");
        const data = await response.json();
        setMember(data);
        setStatus(data.status || "");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMember();
  }, [id]);

  const updateStatus = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/members/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...member, status }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setMember(updated);
      alert("Status updated");
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteMember = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`${BASE_URL}/api/members/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete member");
      alert("Member deleted");
      navigate("/members");
    } catch (err) {
      alert(err.message);
    }
  };

  const navigateToEdit = () => {
    navigate(`/member/edit/${id}`);
  };

  return (
    <Container className="py-4">
      <Link className="btn btn-light mb-3" to="/members">
        Go Back
      </Link>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <>
          {member && (
            <Row className="gy-4">
              <Col md={3}>
                <Image src={member.image} alt={member.name} fluid rounded />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{member.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Email: {member.email}</ListGroup.Item>
                  <ListGroup.Item>Phone: {member.phone}</ListGroup.Item>
                  <ListGroup.Item>Gender: {member.gender}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Join Date:</Col>
                        <Col>{new Date(member.joinDate).toLocaleDateString()}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Membership:</Col>
                        <Col>{member.membershipType}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <Form.Control
                            size="sm"
                            as="select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            {["Active", "Inactive", "Suspended"].map((x) => (
                              <option key={x} value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={updateStatus}
                      >
                        Update
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
              <Col>
                <ListGroup variant="flush">
                  <Row>
                    <ListGroup.Item variant="secondary">
                      <Button onClick={navigateToEdit}>
                        <i className="fas fa-edit"></i>
                      </Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button variant="danger" onClick={deleteMember}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </ListGroup.Item>
                  </Row>
                </ListGroup>
              </Col>
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default MemberDetailsView;
