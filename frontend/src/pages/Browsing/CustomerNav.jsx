import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
const CustomerNav = () => {
  return (
    <Nav className="ml-auto" style={{ marginRight: '20px' }}>
    <NavDropdown title="Actions" id="basic-nav-dropdown" >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
    </NavDropdown>
    <NavDropdown title="Account" id="basic-nav-dropdown" >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
    </NavDropdown>
    <Nav.Link href="#cart">
        <img src="../assets/cart.png" style={{ width: '30px', marginLeft: '30px' }} alt="" />
    </Nav.Link>
</Nav>
  )
}

export default CustomerNav