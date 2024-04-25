import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image, FormControl, FormGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditItem = () => {
  const navigate = useNavigate();
 const { id } = useParams();
 const [item, setItem] = useState({
    ID: '',
    Name: '',
    Description: '',
    Category: '',
    Price: '',
    ImageBase64: '',
 });
 const [file, setFile] = useState(null); // State to store the file

 useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/items/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchItem();
 }, [id]);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
 };

 const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem({ ...item, ImageBase64: reader.result });
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    navigate("/");
 };

 return (
    <Container className="p-3 my-5 d-flex flex-column w-50 text-white">
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Name</Form.Label>
          <FormControl type="text" placeholder="Username" name="Name" value={item.Name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <FormControl type="text" placeholder="Description" name="Description" value={item.Description} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <FormControl as="select" value={item.Category} name= "Category" onChange={handleChange}>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Furniture">Furniture</option>
            <option value="Toys">Toys</option>
          </FormControl>
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <FormControl type="number" placeholder="Price" name="Price" value={item.Price} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicImage">
          <Form.Label>Upload Image</Form.Label>
          <FormControl type="file" name="ImageBase64" onChange={handleFileChange} />
        </Form.Group>
        {/* Display the image */}
        {item.ImageBase64 && (
          <Image src={item.ImageBase64}  width={"100px"} height={"100px"}rounded />
        )}
        <Button variant="primary" onClick={handleSubmit }>
          Update
        </Button>
      </Form>
    </Container>
 );
};

export default EditItem;
