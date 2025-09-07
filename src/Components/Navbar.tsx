import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


const NavBar: React.FC = () => (
   <Navbar bg="transparent" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/work">Service</Nav.Link>
            <Nav.Link as={Link} to="/skill">Skills</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
);

export default NavBar;