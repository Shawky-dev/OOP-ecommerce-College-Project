import React from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import './CartComponent.css';
const data = [
    {
       "userCart": [
         {
           "quantity": 2,
           "ID": 1,
           "price": 123,
           "name": "apple"
         },
         {
           "quantity": 1,
           "ID": 2,
           "price": 312,
           "name": "banana"
         }
       ],
       "TotalPrice": 558,
       "Address": "address",
       "Date": "04/24/2024 11:03 PM"
    },
    {
       "userCart": [
         {
           "quantity": 2,
           "ID": 2,
           "price": 312,
           "name": "banana"
         },
         {
           "quantity": 2,
           "ID": 1,
           "price": 123,
           "name": "apple"
         }
       ],
       "TotalPrice": 870,
       "Address": "address",
       "Date": "04/24/2024 11:04 PM"
    }
   ];
const CartComponent = () => {
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
