import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from "react";
import ItemCartCard from './ItemCartCard';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
 const [items, setItems] = useState([]);
 const [refresh, setRefresh] = useState(false);

 const handleChange = () => {
    setRefresh(prev => !prev); // Toggle the refresh state to trigger a re-fetch
 };

 const getUserID = () => {
    return localStorage.getItem('id');
 };
const Checkout = async ()=>{
  const response = await fetch(`http://localhost:8080/cartCheckout/`+ getUserID(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    navigate("/");
}
 useEffect(() => {
    fetch('http://localhost:8080/cart/'+getUserID())
        .then(response => response.json())
        .then(data => {
          setItems(data)
          console.log(items)
        })
        .catch(error => console.error('Error:', error));
 }, [refresh]);

 // Calculate total items and total price
 const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
 const totalPrice = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

 return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8} style={{marginTop:"50px", backgroundColor:"whitesmoke"}}>
          <h2>Your Shopping Cart</h2>
          <ListGroup>
            <Row>
              {items.length > 0 ? (
                <>
                 {items.map((card, index) => (
                    <Col key={index} xs={12} md={6} lg={4} style={{marginLeft:"30px"}}>
                      <ItemCartCard id={card.ID} quantity={card.quantity} onChange={handleChange}/> 
                    </Col>
                  ))}
                </>
              ) : (
                <p>no orders received yet</p>
              )}
            </Row>
          </ListGroup>
          <div className="cart-summary">
            <p>Total Items: <span id="total-items">{totalItems}</span></p>
            <p>Total Price: <span id="total-price">${totalPrice.toFixed(2)}</span></p>
          </div>
          <Button variant="primary"onClick={()=>Checkout()}  >Checkout</Button>
        </Col>
      </Row>
    </Container>
 );
}

export default Cart;
