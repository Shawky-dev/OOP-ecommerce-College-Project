import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

function MyNavbar({ onSearchUpdate }) {
    // Step 2: Create a state variable to hold the search input value
    const [searchValue, setSearchValue] = useState('');

    // Step 4: Add an onClick handler to the Button
    const handleSearch = (event) => {
        event.preventDefault();
        if(searchValue){

            onSearchUpdate(searchValue);
            console.log(searchValue);
        }else{

            onSearchUpdate("*");
        }
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home"><img src="../assets/logo-white-new1.png" style={{ width: '100px', marginLeft: '20px' }} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Form inline="true" className="mx-auto d-flex" onSubmit={handleSearch}>
                    <FormControl
                        type="text"
                        placeholder="Search"
                        className="mr-sm-2"
                        style={{ width: '500px' }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button variant="outline-success" style={{ marginLeft: '10px' }} type="submit">Search</Button>
                </Form>
                
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
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
