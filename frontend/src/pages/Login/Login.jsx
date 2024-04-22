import React, { useState } from 'react';
import { Container, Tabs, Tab, Form, Button, FormControl } from 'react-bootstrap';

function Login() {
 const [key, setKey] = useState('login');

 return (
    <Container className="p-3 my-5 d-flex flex-column w-50 text-white" >
      <Tabs
        id="uncontrolled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
        
      >
        <Tab eventKey="login" title="Login" >
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <FormControl type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign in
            </Button>
          </Form>
        </Tab>
        <Tab eventKey="register" title="Register">
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <FormControl type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <FormControl type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <FormControl type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <FormControl type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Sign up
            </Button>
          </Form>
        </Tab>
      </Tabs>
    </Container>
    

 );
}

export default Login;
