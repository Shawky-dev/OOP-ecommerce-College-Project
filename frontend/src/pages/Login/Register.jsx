import React, { useState } from 'react';
import { Container, Form, Button, FormControl, FormCheck, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
 const [role, setRole] = useState('customer'); // Default role is 'customer'
 const [username, setUsername] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [address, setAddress] = useState(''); // State for the address
 const [errorMessage, setErrorMessage] = useState(''); // State to manage error message
 const navigate = useNavigate(); // Use the useNavigate hook

 const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Construct the request body based on the role
    let requestBody = {
      Name: username,
      _pass: password,
      _mail: email,
    };

    // Include the address in the request body only for customers
    if (role === 'customer') {
      requestBody.Address = address;
    }

    const requestUrl = role === 'customer' ? 'http://localhost:8080/newCustomer' : 'http://localhost:8080/newAdmin'; // Update the URL based on the role

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    if (data.code === 200) {
      // Save variables to local storage
      localStorage.setItem('IsLogged', true);
      localStorage.setItem('id', data.user.ID);
      localStorage.setItem('role', role);
      console.log('Registration successful');
      // Navigate to the root route upon successful registration
      navigate('/');
    } else if (data.code === 409) {
      // Display error message
      setErrorMessage('Email already exists');
    }
 };

 return (
    <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <FormControl type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <FormControl type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <FormControl type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        {role === 'customer' && (
          <Form.Group controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <FormControl type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
        )}

        <Form.Group controlId="formBasicRole">
          <Form.Label>Role</Form.Label>
          <FormCheck
            type="radio"
            label="Customer"
            name="role"
            id="roleCustomer"
            value="customer"
            checked={role === 'customer'}
            onChange={(e) => setRole(e.target.value)}
          />
          <FormCheck
            type="radio"
            label="Admin"
            name="role"
            id="roleAdmin"
            value="admin"
            checked={role === 'admin'}
            onChange={(e) => setRole(e.target.value)}
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </Container>
 );
};

export default Register;
