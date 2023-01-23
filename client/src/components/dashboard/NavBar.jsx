import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {Outlet, Link} from "react-router-dom";
import { Speedometer, Bank, Bank2, ListUl } from 'react-bootstrap-icons';
import { MdDashboard } from 'react-icons/md';
import '../../styles/SideBar.css'


const NavBar = () => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/"> <MdDashboard /> Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className='nav-link'><MdDashboard /> Dashboard</Nav.Link>
              <Nav.Link as={Link} to="/bank-account" ><Bank2 /> BankAccounts</Nav.Link>
              <Nav.Link as={Link} to="/transaction" ><ListUl /> Transactions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
};

export default NavBar;