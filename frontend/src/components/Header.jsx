import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
const Header = ({ isLoggedIn, logout }) => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  // ✅ Handlers
  const viewMenbers = () => navigate("/members");
  const addMember = () => navigate("/add-member");
  const login = () => navigate("/login");
  const home = () => navigate('/');
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        
            <Navbar.Brand onClick={home}>
               Body Fuel</Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <>
                  <NavDropdown title="More">
                   
                      <NavDropdown.Item onClick={viewMenbers}>View Menbers</NavDropdown.Item>
                    
                   
                      <NavDropdown.Item onClick={addMember}> Add Member</NavDropdown.Item>
                    
                  
                      <NavDropdown.Item >View Analysis</NavDropdown.Item>
                   
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
