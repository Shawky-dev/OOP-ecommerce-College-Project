import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
const ItemCartCard = () => {
  return (
    <>
      <Card style={{ width: '14rem' }}>
        <Card.Img variant="top" width={"100px"} height={"140px"} />
        <Card.Body>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Card.Title>title</Card.Title>
              <Card.Title style={{ fontSize: "14px", opacity: "50%" }}>category</Card.Title>
            </div>
            <Card.Title style={priceTagStyle}>123</Card.Title>
          </div>
            <Card.Text>
              Quantity:
            </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default ItemCartCard