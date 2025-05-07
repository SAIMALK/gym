import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BASE_URL } from "../constants";

const Dashboard = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalFingerprints, setTotalFingerprints] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);


  useEffect(() => {
    // Fetch total members and fingerprints from API
    const fetchDashboardData = async () => {
      try {
        const membersResponse = await fetch(`${BASE_URL}/api/members/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const fingerprintsResponse = await fetch(`${BASE_URL}/api/fingerprint/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const attendanceResponse = await fetch(`${BASE_URL}/api/attendance/getAttendance`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const membersData = await membersResponse.json();
        const fingerprintsData = await fingerprintsResponse.json();
        const attendanceData = await attendanceResponse.json();
console.log(membersData.count);
console.log(fingerprintsData);
console.log(attendanceData.Count);


        setTotalMembers(membersData.count);
        setTotalFingerprints(fingerprintsData);
        setTotalAttendances(attendanceData.Count);
        const absentCount = membersData.count - attendanceData.Count;
        setTotalAbsent(absentCount);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    
    fetchDashboardData();
  }, []);

  return (
    <Container fluid className="dashboard-container py-5">
  <Row className="justify-content-center">
    <Col md={6} className="text-center">
      <h1 className="text-black mb-4">Dashboard</h1>
    </Col>
  </Row>
  <Row className="justify-content-center">
    <Col md={4}>
      <Card className="shadow-lg bg-white text-white card-equal-height">
        <Card.Body className="text-center">
          <i className="fas fa-user"></i>
          <h4 className="mt-3">Total Members</h4>
          <h3>{totalMembers}</h3>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card className="shadow-lg bg-white text-white card-equal-height">
        <Card.Body className="text-center">
          <i className="fas fa-fingerprint"></i>
          <h4 className="mt-3">Total Fingerprints Registered</h4>
          <h3>{totalFingerprints}</h3>
        </Card.Body>
      </Card>
    </Col>
     <Col md={4}>
      <Card className="shadow-lg bg-white text-white card-equal-height">
        <Card.Body className="text-center">
          <i className="fas fa-fingerprint"></i>
          <h4 className="mt-3">Total Present Today </h4>
          <h3>{totalAttendances}</h3>
        </Card.Body>
      </Card>
    </Col>
    <Col md={4}>
      <Card className="shadow-lg bg-white text-white card-equal-height">
        <Card.Body className="text-center">
          <i className="fas fa-fingerprint"></i>
          <h4 className="mt-3">Total Absent Today </h4>
          <h3>{totalAbsent}</h3>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</Container>

  );
};

export default Dashboard;
