import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button, FormControl, FormCheck, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Register from './Register';

function Login() {
 const [key, setKey] = useState('login');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [role, setRole] = useState('customer'); // Default role is 'customer'
 const [errorMessage, setErrorMessage] = useState(''); // State to manage error message
 const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
 const navigate = useNavigate(); // Use the useNavigate hook

 const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Determine the request URL based on the selected role
    const requestUrl = role === 'customer' ? 'http://localhost:8080/authCustomer' : 'http://localhost:8080/authAdmin';

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _pass: password,
        _mail: email,
      }),
    });

    const data = await response.json();
    if (data.code === '200') {
      // Save variables to local storage
      localStorage.setItem('IsLogged', true);
      localStorage.setItem('id', data.id);
      localStorage.setItem('role', role);
      console.log('Login successful');
      // Navigate to the root route upon successful login
      navigate('/');
    } else if (data.code === '404') {
      // Display error message
      setErrorMessage('Incorrect email or password');
    }
 };

 const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
 };

 return (
    <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="login" title="Login">
        <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <FormControl
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="outline-secondary" size="sm"style={{marginTop:"10px"}} onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </Form.Group>

            <Form.Group controlId="formBasicRole">
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
              Sign in
            </Button>
          </Form>
    </Container>

        </Tab>
        <Tab eventKey="register" title="Register">
          <Register/>
        </Tab>
      </Tabs>
    </Container>
 );
}

export default Login;
