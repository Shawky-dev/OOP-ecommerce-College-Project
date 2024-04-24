import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';


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
    const navigate = useNavigate();

    const getUserRole = () => {
        return localStorage.getItem('role');
    };

    const deleteItem = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:8080/items/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Item deleted successfully');
            props.onDelete(); // Call the onDelete function passed down from the App component
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <>
            <Card style={{ width: '12rem'}}>
                <Card.Img variant="top" src={props.ImageBase64} width={"100px"} height={"140px"} />
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
                    <div justify-content={ "space-between"}  >
                    
                        
                    
                    {getUserRole() === 'admin' ? (
                       <>
                        <Button size="sm" variant='danger' onClick={() => deleteItem(props.ID)}>Delete Item</Button>
                        <Button size="sm" variant='warning' onClick={() => navigate(`/edititem/${props.ID}`)}>Edit Item</Button>
                       </>
                    ) : (
                        
                        <Button size="sm" variant="primary">add to Cart</Button>
                    )}
                    </div>

                </Card.Body>
            </Card>
        </>
    );
}

export default ItemCard;
