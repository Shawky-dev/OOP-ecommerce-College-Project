import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import CustomerNav from './CustomerNav';
import AdminNav from './AdminNav'; // Assuming you have an AdminNav component
import { useNavigate } from 'react-router-dom';

function MyNavbar({ onSearchUpdate }) {
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    
    const handleSearch = (event) => {
        event.preventDefault();
        if(searchValue){
            onSearchUpdate(searchValue);
            console.log(searchValue);
        } else {
            onSearchUpdate("*");
        }
    };

    // Function to check if the user is logged in
    const isLoggedIn = () => {
        return localStorage.getItem('IsLogged') === 'true';
    };

    // Function to get the user's role from localStorage
    const getUserRole = () => {
        return localStorage.getItem('role');
    };
    const getUserID = () => {
        return localStorage.getItem('id');
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to the /login route
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
                
                {isLoggedIn() ? (
                    getUserRole() === 'customer' ? (
                        <CustomerNav id ={getUserID()}/>
                    ) : (
                        <AdminNav id = {getUserID()}/>
                    )
                ) : (
                    <Button variant="outline-success" className="ml-auto" style={{ marginRight: '20px' }} onClick={handleLoginClick}>Login/Signup</Button>
                )}
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MyNavbar;
