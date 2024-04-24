import React, { useState } from 'react';
import { Container, Form, Button, Image, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const AddItem = () => {
const navigate = useNavigate();
 const [name, setName] = useState('');
 const [description, setDescription] = useState('');
 const [category, setCategory] = useState('');
 const [price, setPrice] = useState('');
 const [imageBase64, setImageBase64] = useState(null);
 const placeholderImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Placeholder image in Base64

 const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Extract the Base64 string without the prefix
        const base64String = reader.result;
        setImageBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
};

 const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      Name: name,
      Description: description,
      Category: category,
      Price: price,
      ImageBase64: imageBase64,
    };

    try {
      const response = await fetch('http://localhost:8080/newitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log(responseData);
      navigate("/");
      // Handle response data as needed
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
 };

 return (
    <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
      <Form onSubmit={handleSubmit}>
        <FormGroup controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <FormControl type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>

        <FormGroup controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <FormControl type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>

        <FormGroup controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <FormControl as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <FormControl type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </FormGroup>

        <FormGroup controlId="formBasicImage">
          <Form.Label>Upload Image</Form.Label>
          <FormControl type="file" onChange={handleImageUpload} />
        </FormGroup>
        <Button variant="primary" type="submit">
          Add Item
        </Button>
      </Form>
      {imageBase64 ? (
        <Image width={"300px"} height={"200px"} src={imageBase64} rounded />
      ) : (
        <Image src={placeholderImage} rounded />
      )}
    </Container>
 );
};
