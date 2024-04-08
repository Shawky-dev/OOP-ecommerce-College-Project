import { Container, Row, Col, Card } from 'react-bootstrap';
import { useEffect, useState } from "react";

import ItemCard from './ItemCard';
const cardsData = [
    {
        title: "Card",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, minus"
    },
    {
        title: "Card",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, ut!"
    }
];

const MainContent = () => {
    const [item, setItem] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/items')
            .then(response => response.json())
            .then(data => setItem(data))
            .catch(error => console.error('Error:', error));
    }, []);
    console.log(item)

    return (
        <Container>
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <ItemCard title={item.Name} text={item.Description} ImageBase64={item.ImageBase64} Price={item.Price + "$"} SellerName={item.SellerId} />
                </Col>

            </Row>
        </Container>
    );
}

export default MainContent;
