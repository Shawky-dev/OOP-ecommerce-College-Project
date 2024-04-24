import React from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import ItemCartCard from './ItemCartCard';
const Cart = () => {
    return (
    <Container  >
    <Row className="justify-content-md-center" >
      <Col xs={12} md={8} style={{marginTop:"50px", backgroundColor:"whitesmoke"}}>
        <h2>Your Shopping Cart</h2>
        <ListGroup>
            <ItemCartCard/>
        </ListGroup>
        <div className="cart-summary">
          <p>Total Items: <span id="total-items">0</span></p>
          <p>Total Price: <span id="total-price">$0.00</span></p>
        </div>
        <Button variant="primary">Checkout</Button>
      </Col>
    </Row>
  </Container>
);
}

export default Cart