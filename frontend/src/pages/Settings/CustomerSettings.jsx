import React, { useState, useEffect } from 'react';
import { Container, Form, Button, FormControl } from 'react-bootstrap';

const CustomerSettings = ({ id }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePictureBase64, setProfilePictureBase64] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/customers/${id}`);
                const data = await response.json();
                setName(data.Name);
                setAddress(data.Address);
                setEmail(data._mail);
                setPassword(data._pass);
                setProfilePictureBase64(data.ProfilePictureBase64 || null);
            } catch (error) {
                console.error('Failed to fetch customer data:', error);
            }
        };

        fetchCustomerData();
    }, [id]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePictureBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            Name: name,
            ID: id,
            Address: address,
            _pass: password,
            _mail: email,
            ProfilePictureBase64: profilePictureBase64
        };

        try {
            const response = await fetch(`http://localhost:8080/customers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to update customer data');
            }

            alert('Customer data updated successfully');
        } catch (error) {
            console.error('Error updating customer data:', error);
            alert('Failed to update customer data');
        }
    };

    return (
        <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <FormControl type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <FormControl type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <FormControl type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <FormControl type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicImage">
                    <Form.Label>Upload Image</Form.Label>
                    <FormControl type="file" onChange={handleImageUpload} />
                </Form.Group>

                {profilePictureBase64 && (
                    <div>
                        <p>Profile Picture:</p>
                        <img src={profilePictureBase64} alt="Profile" />
                    </div>
                )}

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default CustomerSettings;
