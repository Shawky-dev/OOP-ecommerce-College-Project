import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const CustomerNav = () => {
 const navigate = useNavigate(); // Use the useNavigate hook

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Navigate to the /login route
    navigate('/login');
 };
  return (
    <Nav className="ml-auto" style={{ marginRight: '20px' }}>
  
    <NavDropdown title="Account" id="basic-nav-dropdown" >
    <NavDropdown.Item onClick={()=> navigate('/settings')}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item> 
    </NavDropdown>
    <Nav.Link onClick={() => navigate("/cart")}>
        <img src="../assets/cart.png" style={{ width: '30px', marginLeft: '30px' }} alt="" />
    </Nav.Link>
</Nav>
  )
}

export default CustomerNav