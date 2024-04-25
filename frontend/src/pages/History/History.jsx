import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import './CartComponent.css';
const CartComponent = () => {

  const [data, setData] = useState([]);
  const getUserID = () => {
    return localStorage.getItem('id');
};
 useEffect(() => {
    fetch('http://localhost:8080/customers/'+getUserID())
      .then(response => response.json())
      .then(data => {setData(data.userHistory)
        console.log(data)
      })
      .catch(error => console.error('Error fetching data:', error));
 }, []);
 return (
    <Container>
    <Row className="justify-content-center">
      <Col md={8}>
        <h1 className="title">User Purchase History</h1>
      </Col>
    </Row>
    <div className="table-container">
      <Table striped bordered hover className="table" variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {item.userCart.map((cartItem, cartIndex) => (
               <tr key={cartIndex}>
                 <td>{cartItem.ID}</td>
                 <td>{cartItem.name}</td>
                 <td>{cartItem.quantity}</td>
                 <td>{cartItem.price}</td>
               </tr>
              ))}
              <tr>
               <td colSpan={4}><strong>Total Price:</strong> {item.TotalPrice}</td>
              </tr>
              <tr>
               <td colSpan={4}><strong>Date:</strong> {item.Date}</td>
              </tr>
              <tr>
                <td colSpan={4}><strong>Address:</strong> {item.Address}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  </Container>
 );
};

export default CartComponent;
