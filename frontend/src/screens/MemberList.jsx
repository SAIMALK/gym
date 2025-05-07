import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  ButtonGroup,
  Button,
  Container,
  Table,
} from "react-bootstrap";
import MemberCard from "../components/MemberCard";
import Loading from "../components/loader";
import Message from "../components/message";
import { Link, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../constants";
import Paginate from "../components/paginate";

function MemberList() {
  const [members, setMembers] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const currentPage = Number(searchParams.get("page")) || 1;
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/members?keyword=${encodeURIComponent(keyword)}&pageNumber=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (Array.isArray(data.members)) {
          setMembers(data.members);
          setPages(data.pages);
        } else {
          setError("No members found");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to fetch members");
      });
  }, [keyword, currentPage]); // Use currentPage from URL params

  return (
    <Container>
      <Row className="justify-content-md-center mt-4 mb-4">
        <Col xs lg="2"></Col>
        <Col md="auto">
          <ButtonGroup>
            <Button
              variant={isGrid ? "dark" : "outline-dark"}
              onClick={() => setIsGrid(true)}
            >
              Grid
            </Button>
            <Button
              variant={!isGrid ? "dark" : "outline-dark"}
              onClick={() => setIsGrid(false)}
            >
              Table
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs lg="2"></Col>
      </Row>

      <h1>Members</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : members.length === 0 ? (
        <Message variant="info">No members found</Message>
      ) : isGrid ? (
        <Row>
          {members.map((m) => (
            <Col key={m._id} sm={12} md={6} lg={4} xl={3}>
              <MemberCard member={m} />
            </Col>
          ))}
        </Row>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Id</th>
              <th>Email</th>
              <th>Father's Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Join Date</th>
              <th>Phone</th>
              <th>Membership</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m._id}>
                <td>
                  <Link to={`/member/${m._id}`}>
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    ) : (
                      <span className="text-muted">No Image</span>
                    )}
                  </Link>
                </td>
                <td>
                  <Link to={`/member/${m._id}`} style={{ textDecoration: "none" }}>
                    {m.name}
                  </Link>
                </td>
                <td>{m._id}</td>
                <td>{m.email}</td>
                <td>{m.fatherName}</td>
                <td>{m.age}</td>
                <td>{m.gender}</td>
                <td>{new Date(m.joinDate).toLocaleDateString()}</td>
                <td>{m.phone}</td>
                <td>{m.membershipType}</td>
              </tr>
            ))}
          </tbody>
        </Table>      
        
      )}
      {!loading && !error && members.length > 0 && (
        <Paginate 
          pages={pages} 
          page={currentPage} 
          keyword={keyword ? keyword : ""}
        />
      )}
    </Container>
  );
}

export default MemberList;