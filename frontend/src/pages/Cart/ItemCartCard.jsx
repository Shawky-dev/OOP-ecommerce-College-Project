import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";


const priceTagStyle = {
  display: 'inline-block',
  width: 'auto',
  height: '38px',
  backgroundColor: '#6ab070',
  borderRadius: '3px 4px 4px 3px',
  borderLeft: '1px solid #6ab070',
  marginLeft: '19px',
  position: 'relative',
  color: 'white',
  fontWeight: '300',
  fontSize: '18px',
  lineHeight: '38px',
  padding: '0 10px 0 10px'
}


const ItemCartCard = (props) => {
  const [refresh, setRefresh] = useState(false);

  const handleChange = () => {
    setRefresh(prev => !prev); // Toggle the refresh state to trigger a re-fetch
 };
  const getUserID = () => {
    return localStorage.getItem('id');
};
const addItemToCart = async (id) =>{
  try {
      const response = await fetch(`http://localhost:8080/cart/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID : getUserID(),
              method :"add"
            }),
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      console.log(`Item ${id} added to cart successfully`);
      props.onChange(); 
      handleChange()// Call the onDelete function passed down from the App component
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }

}
const removeItemToCart = async (id) =>{
  try {
      const response = await fetch(`http://localhost:8080/cart/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userID : getUserID(),
              method :"remove"
            }),
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      console.log(`Item ${id} removed to cart successfully`);
      props.onChange();
      handleChange() // Call the onDelete function passed down from the App component
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }

}
  const [item, setItem] = useState({});
  useEffect(() => {
    fetch('http://localhost:8080/items/'+props.id)
        .then(response => response.json())
        .then(data => {
          setItem(data)
          console.log(item)
        })
        .catch(error => console.error('Error:', error));
  }, [props.id]);

  return (
    <>
      <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" width={"100px"} height={"140px"} src={item.ImageBase64}/>
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Card.Title>{item.Name}</Card.Title>
              <Card.Title style={{ fontSize: "14px", opacity: "50%" }}>{item.Category}</Card.Title>
            </div>
            <Card.Title style={priceTagStyle}>${item.Price}</Card.Title>
          </div>
            <Card.Text>
              <div style={{display:"flex",justifyContent:"space-between"}}>
              Quantity:{props.quantity}
              <div>
              <Button size="sm" variant="success" onClick={() =>addItemToCart(props.id)}>+</Button>
              <Button size="sm" variant="danger"onClick={()=>{removeItemToCart(props.id)}} >-</Button>
              </div>
              </div>
            </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default ItemCartCard