import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Form } from "react-bootstrap";

const Header = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate(); // ✅ Hook for navigation
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    // Update search input when URL changes
    if (location.pathname === "/members") {
      const searchParams = new URLSearchParams(location.search);
      setSearchKeyword(searchParams.get("keyword") || "");
    } else {
      setSearchKeyword("");
    }
  }, [location]);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);
    // Navigate to members page with search query
    if (value.trim()) {
      navigate(`/members?keyword=${encodeURIComponent(value)}&page=1`);
    } else {
      navigate("/members?page=1");
    }
  };
  // ✅ Handlers
  const Dashboard = () => navigate("/dashboard");
  const viewMenbers = () => navigate("/members");
  const addMember = () => navigate("/add-member");
  const ViewAttendance = () => navigate("/attendanceView");
  const login = () => navigate("/login");
  const home = () => navigate('/');
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        
            <Navbar.Brand onClick={home} style={{ cursor: "pointer" }}>
               Body Fuel</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto  align-items-center">
              {isLoggedIn ? (

                <>
                <Nav className="  align-items-left">
                <Form className="me-3">
                  <Form.Control
                    type="search"
                    placeholder="Search members..."
                    value={searchKeyword}
                    onChange={handleSearchChange}
                    style={{ minWidth: "250px" ,marginRight:"200px"}}

                  />
                </Form>
                </Nav>
                  <NavDropdown title="More">

                  <NavDropdown.Item onClick={Dashboard}>Dashboard</NavDropdown.Item>
                   
                      <NavDropdown.Item onClick={viewMenbers}>View Menbers</NavDropdown.Item>
                    
                   
                      <NavDropdown.Item onClick={addMember}> Add Member</NavDropdown.Item>
                    
                  
                      <NavDropdown.Item onClick={ViewAttendance}>View Attendance</NavDropdown.Item>
                   
                  </NavDropdown >

                  <NavDropdown title="Admin" id="username">
                
                    <NavDropdown.Item onClick={logout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                
                  <Nav.Link onClick={login}>
                     Sign In
                  </Nav.Link>
               
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
