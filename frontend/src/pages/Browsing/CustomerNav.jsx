import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import { useNavigate } from 'react-router-dom';
const CustomerNav = ({id}) => {
 const navigate = useNavigate(); // Use the useNavigate hook
 const [data, setData] = useState({});

 useEffect(() => {
  fetch('http://localhost:8080/customers/'+id)
    .then(response => response.json())
    .then(data => {setData(data)
      console.log(data)
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Navigate to the /login route
    navigate('/login');
 };
  return (
    <Nav className="ml-auto" style={{ marginRight: '20px' }}>
  <Image src={data.ProfilePictureBase64} roundedCircle width={"50px"}/>
    <NavDropdown title={data.Name} id="basic-nav-dropdown" >
    <NavDropdown.Item onClick={()=> navigate('/settings')}>Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={() =>navigate("/history")}>History </NavDropdown.Item> 
          <NavDropdown.Item onClick={handleLogout}>LogOut</NavDropdown.Item> 
    </NavDropdown>
    <Nav.Link onClick={() => navigate("/cart")}>
        <img src="../assets/cart.png" style={{ width: '30px', marginLeft: '30px' }} alt="" />
    </Nav.Link>
</Nav>
  )
}

export default CustomerNav