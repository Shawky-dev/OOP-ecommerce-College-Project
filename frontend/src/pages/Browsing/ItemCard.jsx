/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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

function ItemCard(props) {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={`data:image/jpeg;base64,${props.ImageBase64}`} width={"200px"} height={"230px"} />
                <Card.Body>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <Card.Title>{props.title}</Card.Title>
                            <Card.Title style={{ fontSize: "14px", opacity: "50%" }}>{props.SellerName}</Card.Title>
                        </div>
                        <Card.Title style={priceTagStyle}>{props.Price}</Card.Title>
                    </div>
                    <Card.Text>
                        {props.text}
                    </Card.Text>
                    <Button variant="primary">add to Cart</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default ItemCard;